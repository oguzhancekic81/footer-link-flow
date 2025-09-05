<?php
session_start();

// Kurulum durumu kontrolü
if (file_exists('config.php') && !isset($_GET['force'])) {
    die('<h2>Kurulum zaten tamamlanmış!</h2><p>Tekrar kurmak için <a href="?force=1">buraya tıklayın</a></p>');
}

$error = '';
$success = '';
$step = isset($_POST['step']) ? $_POST['step'] : 1;

if ($_POST) {
    if ($step == 1) {
        // Database bağlantı testi
        $host = $_POST['db_host'];
        $username = $_POST['db_username']; 
        $password = $_POST['db_password'];
        $database = $_POST['db_name'];
        
        try {
            $pdo = new PDO("mysql:host=$host", $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Database oluştur
            $pdo->exec("CREATE DATABASE IF NOT EXISTS `$database` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
            $pdo->exec("USE `$database`");
            
            // Tabloları oluştur
            $sql = "
            CREATE TABLE IF NOT EXISTS `users` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `email` VARCHAR(191) UNIQUE NOT NULL,
                `username` VARCHAR(50) UNIQUE NOT NULL,
                `password_hash` VARCHAR(255) NOT NULL,
                `role` ENUM('admin', 'publisher', 'buyer') NOT NULL DEFAULT 'buyer',
                `credits` DECIMAL(10,2) DEFAULT 0.00,
                `status` ENUM('active', 'suspended') DEFAULT 'active',
                `email_verified` BOOLEAN DEFAULT FALSE,
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS `sites` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `owner_id` INT NOT NULL,
                `domain` VARCHAR(255) NOT NULL,
                `status` ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
                `verify_method` ENUM('dns', 'file', 'meta') NOT NULL,
                `site_key` VARCHAR(64) UNIQUE,
                `verification_token` VARCHAR(255),
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS `slots` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `site_id` INT NOT NULL,
                `name` VARCHAR(100) NOT NULL DEFAULT 'Footer',
                `max_links` INT DEFAULT 5,
                `price_per_day_credits` DECIMAL(8,2) NOT NULL,
                `rel_type` ENUM('nofollow', 'dofollow') DEFAULT 'nofollow',
                `min_days` INT DEFAULT 7,
                `active` BOOLEAN DEFAULT TRUE,
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (`site_id`) REFERENCES `sites`(`id`) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS `orders` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `buyer_id` INT NOT NULL,
                `slot_id` INT NOT NULL,
                `url` VARCHAR(500) NOT NULL,
                `anchor` VARCHAR(100) NOT NULL,
                `start_at` DATETIME,
                `end_at` DATETIME,
                `days` INT NOT NULL,
                `price_total_credits` DECIMAL(10,2) NOT NULL,
                `status` ENUM('pending', 'live', 'rejected', 'expired', 'refunded') DEFAULT 'pending',
                `queue_position` INT,
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`),
                FOREIGN KEY (`slot_id`) REFERENCES `slots`(`id`)
            );

            CREATE TABLE IF NOT EXISTS `wallet_transactions` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `user_id` INT NOT NULL,
                `type` ENUM('crypto', 'manual', 'refund', 'purchase') NOT NULL,
                `amount` DECIMAL(10,2) NOT NULL,
                `currency` VARCHAR(10),
                `status` ENUM('pending', 'paid', 'failed', 'approved', 'rejected') DEFAULT 'pending',
                `provider` VARCHAR(50),
                `provider_event_id` VARCHAR(255),
                `tx_hash` VARCHAR(255),
                `note` TEXT,
                `evidence_url` VARCHAR(500),
                `reviewed_by` INT,
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
            );

            CREATE TABLE IF NOT EXISTS `embed_snapshots` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `site_id` INT NOT NULL,
                `order_id` INT NOT NULL,
                `checked_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                `found` BOOLEAN NOT NULL,
                `details` JSON,
                FOREIGN KEY (`site_id`) REFERENCES `sites`(`id`),
                FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`)
            );

            CREATE TABLE IF NOT EXISTS `settings` (
                `key` VARCHAR(100) PRIMARY KEY,
                `value` JSON NOT NULL,
                `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS `audit_logs` (
                `id` INT AUTO_INCREMENT PRIMARY KEY,
                `actor_id` INT,
                `action` VARCHAR(100) NOT NULL,
                `meta` JSON,
                `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (`actor_id`) REFERENCES `users`(`id`)
            );
            ";
            
            $pdo->exec($sql);
            
            // Admin kullanıcısı oluştur
            $admin_email = $_POST['admin_email'];
            $admin_password = password_hash($_POST['admin_password'], PASSWORD_DEFAULT);
            
            $stmt = $pdo->prepare("INSERT INTO users (email, username, password_hash, role) VALUES (?, 'admin', ?, 'admin')");
            $stmt->execute([$admin_email, $admin_password]);
            
            // Config dosyası oluştur
            $config = "<?php
define('DB_HOST', '$host');
define('DB_USERNAME', '$username');
define('DB_PASSWORD', '$password');
define('DB_NAME', '$database');
define('APP_URL', '{$_POST['app_url']}');
define('JWT_SECRET', '" . bin2hex(random_bytes(32)) . "');
define('EMBED_CACHE_TIME', 300);

// Database bağlantısı
try {
    \$pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USERNAME, DB_PASSWORD);
    \$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    \$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException \$e) {
    die('Database bağlantı hatası: ' . \$e->getMessage());
}
?>";
            
            file_put_contents('config.php', $config);
            
            $success = 'Kurulum başarıyla tamamlandı! Admin paneline giriş yapabilirsiniz.';
            $step = 2;
            
        } catch (Exception $e) {
            $error = 'Database hatası: ' . $e->getMessage();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Link Paneli Kurulum</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
        button { background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #005a87; }
        .error { background: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px; margin-bottom: 15px; }
        .success { background: #d4edda; color: #155724; padding: 10px; border-radius: 4px; margin-bottom: 15px; }
        .card { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; text-align: center; }
    </style>
</head>
<body>
    <div class="card">
        <h1>🔗 Link Paneli Kurulum</h1>
        
        <?php if ($error): ?>
            <div class="error"><?= $error ?></div>
        <?php endif; ?>
        
        <?php if ($success): ?>
            <div class="success"><?= $success ?></div>
        <?php endif; ?>
        
        <?php if ($step == 1): ?>
            <form method="POST">
                <input type="hidden" name="step" value="1">
                
                <h3>📊 Database Ayarları</h3>
                
                <div class="form-group">
                    <label>Database Host:</label>
                    <input type="text" name="db_host" value="localhost" required>
                </div>
                
                <div class="form-group">
                    <label>Database Kullanıcı Adı:</label>
                    <input type="text" name="db_username" required>
                </div>
                
                <div class="form-group">
                    <label>Database Şifre:</label>
                    <input type="password" name="db_password">
                </div>
                
                <div class="form-group">
                    <label>Database Adı:</label>
                    <input type="text" name="db_name" value="link_paneli" required>
                </div>
                
                <h3>👤 Admin Hesabı</h3>
                
                <div class="form-group">
                    <label>Admin E-posta:</label>
                    <input type="email" name="admin_email" required>
                </div>
                
                <div class="form-group">
                    <label>Admin Şifre:</label>
                    <input type="password" name="admin_password" minlength="6" required>
                </div>
                
                <h3>🌐 Site Ayarları</h3>
                
                <div class="form-group">
                    <label>Site URL:</label>
                    <input type="url" name="app_url" value="<?= (isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) ?>" required>
                </div>
                
                <button type="submit">Kurulumu Başlat</button>
            </form>
        <?php elseif ($step == 2): ?>
            <div style="text-align: center;">
                <h3>✅ Kurulum Tamamlandı!</h3>
                <p>Sistem başarıyla kuruldu. Artık uygulamanızı kullanmaya başlayabilirsiniz.</p>
                
                <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 4px;">
                    <strong>📁 Dosyalar:</strong><br>
                    ✓ config.php oluşturuldu<br>
                    ✓ Database tabloları oluşturuldu<br>
                    ✓ Admin hesabı oluşturuldu
                </div>
                
                <p><a href="index.html" style="background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Siteye Git</a></p>
                
                <hr style="margin: 30px 0;">
                
                <h4>🛠 phpMyAdmin Kurulumu</h4>
                <p>phpMyAdmin'i kurmak için <a href="install_phpmyadmin.php">buraya tıklayın</a></p>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>