
$lines = Get-Content -LiteralPath 'C:\Users\liuy\Pictures\新建文件夹\zgj1533_HrbxC\zgj\backend\pack_list.txt'
$zipPath = 'C:\Users\liuy\Pictures\新建文件夹\zgj1533_HrbxC\zgj_deploy_latest.zip'
if (Test-Path -LiteralPath $zipPath) { Remove-Item -LiteralPath $zipPath -Force }

Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.IO.Compression

$baseDir = 'C:\Users\liuy\Pictures\新建文件夹\zgj1533_HrbxC\zgj'
$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)

foreach ($line in $lines) {
  if ([string]::IsNullOrWhiteSpace($line)) { continue }
  $rel = $line.Substring($baseDir.Length + 1).Replace('\', '/')
  [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $line, $rel, [System.IO.Compression.CompressionLevel]::Optimal)
}

$zip.Dispose()
Write-Host "ZIP COMPLETED SUCCESSFULLY!"
Get-Item -LiteralPath $zipPath | Select-Object Name, Length, LastWriteTime
