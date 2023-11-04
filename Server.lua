Callbacks = {}
Callbacks.ServerCallbacks = {}

RegisterServerEvent('Callbacks:triggerServerCallback')
AddEventHandler('Callbacks:triggerServerCallback', function(name, requestId, ...)
    local _source = source

    Callbacks.TriggerServerCallback(name, requestID, _source, function(...)
        TriggerClientEvent('Callbacks:serverCallback', _source, requestId, ...)
    end, ...)
end)

Callbacks.RegisterServerCallback = function(name, cb)
    Callbacks.ServerCallbacks[name] = cb
end

Callbacks.TriggerServerCallback = function(name, requestId, source, cb, ...)
    if Callbacks.ServerCallbacks[name] ~= nil then
        Callbacks.ServerCallbacks[name](source, cb, ...)
    else
        print('Callbacks.TriggerServerCallback => [' .. name .. '] does not exist')
    end
end


RegisterServerEvent('Rovelt_skill:UpdateSkill')
AddEventHandler('Rovelt_skill:UpdateSkill', function(skill, playerlevel, skillCost)
    local player = GetPlayerIdentifier(source)
    MySQL.query("SELECT skills FROM skillpoints WHERE player = @player", {["@player"] = player}, function(skills)
        local data = {}
        if skills[1] and skills[1].skills then
            data = json.decode(skills[1].skills)
        end

        data[skill] = playerlevel

        MySQL.update('UPDATE skillpoints SET skills = @DATA, points = points - @COST WHERE player = @player', {
            ["@player"] = player,
            ['@DATA'] = json.encode(data),
            ['@COST'] = skillCost
        })
    end)
end)


Callbacks.RegisterServerCallback('Rovelt_GetIdentifier', function(source, cb)
    local player = GetPlayerIdentifier(source)
    MySQL.query("SELECT * FROM skillpoints WHERE player = @player", {["@player"] = player}, function(skillpoints)
        local data = { player = player, points = 0, skills = {} }
        if skillpoints[1] == nil then
            MySQL.insert('INSERT INTO skillpoints (player, points, skills) VALUES (?, ?, ?)', {
                player,
                0,
                json.encode({})
            }, function()
            end)
        end
        
        if skillpoints[1] ~= nil then
            data.points = skillpoints[1].points
            data.skills = json.decode(skillpoints[1].skills)
        end
        Wait(100)
        cb(data)
    end)
end)

