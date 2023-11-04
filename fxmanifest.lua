fx_version 'cerulean'
games { 'gta5' }

author 'Rovelt'
description 'Skillpoint script'
version '1.0'

client_scripts {
    'Client.lua'
}


exports {
    "CheckLevel"
}

server_scripts {
    'Server.lua',
    '@oxmysql/lib/MySQL.lua'
}

ui_page 'HTML/index.html'

files {
    'html/index.html',
    'html/script.js',
    'html/style.css',
}

shared_scripts {
    '@ox_lib/init.lua'
}

lua54 'yes'