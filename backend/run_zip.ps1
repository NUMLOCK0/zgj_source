
$lines = Get-Content -LiteralPath "C:\Users\liuy\Pictures\新建文件夹\zgj1282_sP2PR\zgj\backend\files_to_zip.txt"
Compress-Archive -LiteralPath $lines -DestinationPath "C:\Users\liuy\Pictures\新建文件夹\zgj1282_sP2PR\zgj\zgj_update_package.zip" -Force
Write-Host "Success: C:\Users\liuy\Pictures\新建文件夹\zgj1282_sP2PR\zgj\zgj_update_package.zip"
