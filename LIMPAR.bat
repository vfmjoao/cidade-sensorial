@echo off
echo Limpando cache do projeto...
cd /d "%~dp0"
Remove-Item -Recurse -Force .expo -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue
echo Cache limpo! Execute INICIAR.bat para iniciar o projeto.

