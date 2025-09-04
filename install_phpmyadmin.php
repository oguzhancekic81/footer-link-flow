<?php
// phpMyAdmin otomatik kurulum scripti
set_time_limit(300); // 5 dakika

$error = '';
$success = '';
$step = isset($_GET['step']) ? $_GET['step'] : 1;

if ($_POST && isset($_POST['install'])) {
    
    $phpMyAdminUrl = 'https://files.phpmyadmin.net/phpMyAdmin/5.2.1/phpMyAdmin-5.2.1-all-languages.zip';
    $zipFile = 'phpmyadmin.zip';
    $extractPath = 'phpmyadmin';
    
    try {
        // phpMyAdmin'i indir
        echo '<h3>📥 phpMyAdmin indiriliyor...</h3>';
        flush();
        
        $zipContent = file_get_contents($phpMyAdminUrl);
        if (!$zipContent) {
            throw new Exception('phpMyAdmin indirilemedi!');
        }
        
        file_put_contents($zipFile, $zipContent);
        echo '✓ İndirme tamamlandı<br>';
        flush();
        
        // ZIP dosyasını çıkart
        echo '<h3>📂 Dosyalar çıkartılıyor...</h3>';
        flush();
        
        $zip = new ZipArchive;
        if ($zip->open($zipFile) === TRUE) {
            $zip->extractTo('.');
            $zip->close();
            
            // Klasör adını değiştir
            $extractedFolder = glob('phpMyAdmin-*')[0];
            if ($extractedFolder && is_dir($extractedFolder)) {
                rename($extractedFolder, $extractPath);
            }
            
            echo '✓ Çıkartma tamamlandı<br>';
            flush();
        } else {
            throw new Exception('ZIP dosyası açılamadı!');
        }
        
        // Config dosyası oluştur
        echo '<h3>⚙️ Yapılandırma dosyası oluşturuluyor...</h3>';
        flush();
        
        if (file_exists('config.php')) {
            include 'config.php';
            
            $configContent = "<?php
declare(strict_types=1);

\$cfg['blowfish_secret'] = '" . bin2hex(random_bytes(16)) . "';

\$i = 0;
\$i++;

\$cfg['Servers'][\$i]['auth_type'] = 'cookie';
\$cfg['Servers'][\$i]['host'] = '" . DB_HOST . "';
\$cfg['Servers'][\$i]['compress'] = false;
\$cfg['Servers'][\$i]['AllowNoPassword'] = false;

\$cfg['UploadDir'] = '';
\$cfg['SaveDir'] = '';
\$cfg['DefaultLang'] = 'tr';
\$cfg['ServerDefault'] = 1;
\$cfg['SendErrorReports'] = 'never';
?>";
            
            file_put_contents($extractPath . '/config.inc.php', $configContent);
            echo '✓ Yapılandırma tamamlandı<br>';
            flush();
        }
        
        // Geçici dosyaları temizle
        unlink($zipFile);
        
        $success = 'phpMyAdmin başarıyla kuruldu!';
        $step = 2;
        
    } catch (Exception $e) {
        $error = 'Kurulum hatası: ' . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>phpMyAdmin Kurulum</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
        .card { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; text-align: center; }
        .error { background: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px; margin-bottom: 15px; }
        .success { background: #d4edda; color: #155724; padding: 10px; border-radius: 4px; margin-bottom: 15px; }
        button { background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #005a87; }
        .info { background: #cce7ff; padding: 15px; border-radius: 4px; margin: 15px 0; }
        .warning { background: #fff3cd; color: #856404; padding: 10px; border-radius: 4px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="card">
        <h1>🛠 phpMyAdmin Kurulum</h1>
        
        <?php if ($error): ?>
            <div class="error"><?= $error ?></div>
        <?php endif; ?>
        
        <?php if ($success): ?>
            <div class="success"><?= $success ?></div>
        <?php endif; ?>
        
        <?php if ($step == 1): ?>
            
            <?php if (!file_exists('config.php')): ?>
                <div class="error">
                    <strong>Hata:</strong> config.php dosyası bulunamadı! Önce ana kurulumu tamamlayın.
                </div>
                <p><a href="install.php">Ana Kurulum</a></p>
            <?php else: ?>
                
                <div class="info">
                    <strong>ℹ️ Bilgi:</strong> phpMyAdmin, veritabanınızı web üzerinden yönetmenize olanak sağlar.
                    Bu kurulum phpMyAdmin'in son sürümünü otomatik olarak indirecek ve yapılandıracaktır.
                </div>
                
                <div class="warning">
                    <strong>⚠️ Uyarı:</strong> Kurulum yaklaşık 2-3 dakika sürebilir. Sayfayı kapatmayın.
                </div>
                
                <h3>📋 Kurulum Gereksinimleri</h3>
                <ul>
                    <li>✓ PHP ZipArchive desteği</li>
                    <li>✓ İnternet bağlantısı (indirme için)</li>
                    <li>✓ Yazma izni</li>
                </ul>
                
                <form method="POST">
                    <button type="submit" name="install" onclick="this.disabled=true; this.innerHTML='Kuruluyor...';">
                        phpMyAdmin'i Kur
                    </button>
                </form>
            <?php endif; ?>
            
        <?php elseif ($step == 2): ?>
            
            <div style="text-align: center;">
                <h3>✅ phpMyAdmin Kuruldu!</h3>
                
                <div class="info">
                    <strong>📁 Kurulum Detayları:</strong><br>
                    • phpMyAdmin klasörü oluşturuldu<br>
                    • Yapılandırma dosyası hazırlandı<br>
                    • Türkçe dil desteği etkinleştirildi
                </div>
                
                <p>
                    <a href="phpmyadmin/" 
                       style="background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-right: 10px;">
                        phpMyAdmin'i Aç
                    </a>
                    
                    <a href="index.html" 
                       style="background: #007cba; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
                        Ana Siteye Dön
                    </a>
                </p>
                
                <div class="warning" style="margin-top: 20px;">
                    <strong>🔐 Giriş Bilgileri:</strong><br>
                    Database kurulumunda belirlediğiniz kullanıcı adı ve şifreyi kullanın.
                </div>
                
                <div style="margin-top: 20px; font-size: 14px; color: #666;">
                    <strong>💡 İpucu:</strong> Güvenlik için phpMyAdmin klasörünü kurulum sonrası yeniden adlandırabilirsiniz.
                </div>
            </div>
            
        <?php endif; ?>
    </div>
</body>
</html>