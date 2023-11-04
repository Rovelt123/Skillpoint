let skillPoints = 0;
let skillLevels = [];

const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const numRows = 3;
const numCols = 4;
const totalSkills = numRows * numCols;
let currentPage = 0;

const Config = [
    {
        label: "DRUG COLLECTING",
        levels: {
            level1: 1,
            level2: 2,
            level3: 3,
            level4: 4,
            level5: 5,
            level6: 6,
            level7: 7,
            level8: 8,
            level9: 9,
            level10: 10,
        }
    },
    {
        label: "DRUG PROCESSING",
        levels: {
            level1: 1,
            level2: 2,
            level3: 3,
            level4: 4,
            level5: 15,
            level6: 6,
            level7: 7,
            level8: 8,
            level9: 9,
            level10: 10,
        }
    },
    {
        label: "DRUG SELLING",
        levels: {
            level1: 1,
            level2: 2,
            level3: 3,
            level4: 4,
            level5: 5,
            level6: 6,
            level7: 7,
            level8: 8,
            level9: 9,
            level10: 10,
        }
    },
    {
        label: "YOUR SKILL HERE",
        levels: {
            level1: 1,
            level2: 2,
            level3: 3,
            level4: 4,
            level5: 5,
            level6: 6,
            level7: 7,
            level8: 8,
            level9: 9,
            level10: 10,
        }
    },
    {
        label: "NEW SKILL 1",
        levels: {
            level1: 1,
            level2: 2,
            level3: 3,
            level4: 4,
            level5: 5,
            level6: 6,
            level7: 7,
            level8: 8,
            level9: 9,
            level10: 10,
        }
    },
    {
        label: "NEW SKILL 2",
        levels: {
            level1: 1,
            level2: 2,
            level3: 3,
            level4: 4,
            level5: 5,
            level6: 6,
            level7: 7,
            level8: 8,
            level9: 9,
            level10: 10,
        }
    },
    {
        label: "NEW SKILL 3",
        levels: {
            level1: 1,
            level2: 2,
            level3: 3,
            level4: 4,
            level5: 5,
            level6: 6,
            level7: 7,
            level8: 8,
            level9: 9,
            level10: 10,
        }
    },
    {
        label: "NEW SKILL 4",
        levels: {
            level1: 1,
            level2: 2,
            level3: 3,
            level4: 4,
            level5: 5,
            level6: 6,
            level7: 7,
            level8: 8,
            level9: 9,
            level10: 10,
        }
    },
    {
        label: "NEW SKILL 5",
        levels: {
            level1: 1,
            level2: 2,
            level3: 3,
            level4: 4,
            level5: 5,
            level6: 6,
            level7: 7,
            level8: 8,
            level9: 9,
            level10: 10,
        }
    },
    {
        label: "NEW SKILL 6",
        levels: {
            level1: 1,
            level2: 2,
            level3: 3,
            level4: 4,
            level5: 5,
            level6: 6,
            level7: 7,
            level8: 8,
            level9: 9,
            level10: 10,
        }
    },
    {
        label: "JOE MAMA",
        levels: {
            level1: 1,
            level2: 2,
            level3: 3,
            level4: 4,
            level5: 5,
            level6: 6,
            level7: 7,
            level8: 8,
            level9: 9,
            level10: 10,
        }
    },
    {
        label: "NEW SKILL 7",
        levels: {
            level1: 1,
            level2: 2,
            level3: 3,
            level4: 4,
            level5: 5,
            level6: 6,
            level7: 7,
            level8: 8,
            level9: 9,
            level10: 10,
        }
    },
    {
        label: "NEW SKILL LAST",
        levels: {
            level1: 1,
            level2: 2,
            level3: 3,
            level4: 4,
            level5: 5,
            level6: 6,
            level7: 7,
            level8: 8,
            level9: 9,
            level10: 10,
        }
    },
];

function purchaseSkill(skillNumber, skill, nextLevelKey, nextLevelCost) {
    if (skillPoints >= nextLevelCost) {
        skillPoints = skillPoints - nextLevelCost;
        playerlevel = nextLevelKey;
        updatePlayerData(skill.label, nextLevelKey, nextLevelCost);
    } else {
        $('.skill-container').hide();
        $.post(`https://${GetParentResourceName()}/Insufficient-funds`, JSON.stringify({}));
    }
}

function updatePlayerData(skill, levelNumber, skillCost) {
    $('.skill-container').hide();
    $.post(`https://${GetParentResourceName()}/updatedlevel`, JSON.stringify({ skill: skill, playerlevel: levelNumber, skillCost: skillCost }));
}

$(document).on('click', ".close-button", function() {
    $('.skill-container').hide();
    $.post(`https://${GetParentResourceName()}/close-menu`, JSON.stringify({ }));
});  


function updateSkillPoints() {
    const skillPointsElement = document.getElementById('skillPoints');
    skillPointsElement.textContent = skillPoints;
    for (let i = 1; i <= numRows; i++) {
        const row = document.getElementById(`skill-row${i}`);
        row.innerHTML = '';
    }
    const startIndex = currentPage * totalSkills;
    const endIndex = startIndex + totalSkills;
    const displayedItems = Config.slice(startIndex, endIndex);
    for (let i = 0; i < displayedItems.length; i++) {
        const rowIndex = Math.floor(i / numCols) + 1;
        const row = document.getElementById(`skill-row${rowIndex}`);
        const skill = displayedItems[i];
        const theskilllabel = skill.label;
        const currentLevelKey = skillLevels[theskilllabel] || 1;
        const nextLevelKey = currentLevelKey + 1;
        const nextLevelCost = skill.levels[`level${nextLevelKey}`];
        var button = document.createElement('button');
        const skillNumber = startIndex + i;
        if (currentLevelKey === 10) {
            button.textContent = 'MAXED';
            button.disabled = true;
        } else if (skillPoints >= nextLevelCost) {
            button.textContent = 'BUY';
            button.onclick = function () {
                purchaseSkill(skillNumber, skill, nextLevelKey, nextLevelCost);
            };
        } else {
            button.textContent = 'INSUFFICIENT FUNDS';
            button.disabled = true;
        }
        var skillBox = document.createElement('div');
        skillBox.classList.add('skill-box');
        var title = document.createElement('h2');
        title.textContent = theskilllabel;
        var skillCost = document.createElement('p');
        if (currentLevelKey === 10) {
            skillCost.textContent = `MAXED`;
        } else {
            skillCost.textContent = `Costs: ${nextLevelCost} Skill points`;
        }
        skillBox.appendChild(title);
        skillBox.appendChild(skillCost);
        skillBox.appendChild(button);
        row.appendChild(skillBox);
    }
    $('.skill-container').show();
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const totalPages = Math.ceil(Config.length / totalSkills);
    if (totalPages > 1) {
        $('.button-container').show();
    } else {
        $('.button-container').hide();
    }
}


function navigateSkills(direction) {
    currentPage += direction;
    updateSkillPoints();
}

var playerlevel = null;

window.addEventListener('message', function (event) {
    if (event.data.player) {
        const { points, skills } = event.data;
        skillPoints = points;
        skillLevels = skills;
        updateSkillPoints();
    }
});

$('.skill-container').hide();

