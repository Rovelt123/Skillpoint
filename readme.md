Put this in your script and in the config of your script

Config.lua:
Config = {}
Config.startamount = 10
Config.Percent = 400


Client.lua (This is just an example. You can use this as you want! :D ):
RegisterCommand('skills2', function(source, args, rawCommand)
    local startamount = Config.startamount
    local Percent = Config.Percent
    local thelevel = exports['Skillpoint']:CheckLevel("DRUG COLLECTING", function(thelevel)
        if thelevel then
            local unit = math.max(1, math.min(10, thelevel))
            local percentageIncrease = (unit - 1) / 9 * Percent
            local increasedAmount = math.ceil(startamount + (startamount * percentageIncrease / 100))
            print("Your level: " .. thelevel .. " Out of 10")
            print("Start amount:" ..startamount)
            print("+ Percent: " .. percentageIncrease .. "%")
            print("New amount: " .. increasedAmount)
        end
    end)
end)


And instead of using my callback, then edit it to your own (qb-core, esx or just use mine! :D)