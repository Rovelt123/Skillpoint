InUi = false
CheckLevel = function(skill, callback)
    Callbacks.TriggerServerCallback("Rovelt_GetIdentifier", function(info)
        local thelevel = nil
        for k, v in pairs(info.skills) do
            if k == skill then
                thelevel = v
                break
            end
        end
        if not thelevel then
            thelevel = 0
        end
        Wait(10)
        callback(thelevel)
    end)
end

RegisterCommand('skills', function(source, args, rawCommand)
    Callbacks.TriggerServerCallback("Rovelt_GetIdentifier", function(info)
        if not InUi then
            InUi = true 
            SendNUIMessage({
                player = info.player,
                points = info.points, 
                skills = info.skills
            })
            while InUi do
                Wait(5)
                SetNuiFocus(InUi, true)
            end
            Wait(100)
            SetNuiFocus(false, false)
        end
    end)
end)

RegisterNUICallback('updatedlevel', function(data)
    InUi = false
    TriggerServerEvent("Rovelt_skill:UpdateSkill", data.skill, data.playerlevel, data.skillCost)
end)

RegisterNUICallback('close-menu', function(data)
    InUi = false
end)



RegisterNUICallback('Insufficient-funds', function(data)
    InUi = false
    print("Insufficient funds!")
end)



Callbacks = {}
Callbacks.CurrentRequestId          = 0
Callbacks.ServerCallbacks           = {}

Callbacks.TriggerServerCallback = function(name, cb, ...)
    Callbacks.ServerCallbacks[Callbacks.CurrentRequestId] = cb

    TriggerServerEvent('Callbacks:triggerServerCallback', name, Callbacks.CurrentRequestId, ...)

    if Callbacks.CurrentRequestId < 65535 then
        Callbacks.CurrentRequestId = Callbacks.CurrentRequestId + 1
    else
        Callbacks.CurrentRequestId = 0
    end
end

RegisterNetEvent('Callbacks:serverCallback')
AddEventHandler('Callbacks:serverCallback', function(requestId, ...)
    Callbacks.ServerCallbacks[requestId](...)
    Callbacks.ServerCallbacks[requestId] = nil
end)