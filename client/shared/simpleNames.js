export default [
    ['BattleEntity', 1, /\("isPossessed",1,[\w$]+,/],
    ['NativeList', 12, /\.callableName="compare",[\w$]+\)/],
    [
        'WeaponTrigger',
        2,
        /function\(\)\{this\.[\w$]+=[\w$]+\(this\.[\w$]+\(\)\);var [\w$]+,[\w$]+,[\w$]+=this\.[\w$]+\(\),[\w$]+=\([\w$]+=this,\([\w$]+=function\([\w$]+\)\{var [\w$]+;return\([\w$]+=[\w$]+\)\.[\w$]+=[\w$]+\([\w$]+\.[\w$]+\(\)\),[\w$]+\(\)\}\)\.callableName="initHud",[\w$]+\);[\w$]+\.[\w$]+\([\w$]+\([\w$]+\),0,!1,[\w$]+\);/
    ],
    [
        'SpeedCharacteristicsComponent',
        1,
        /\.callableName="setSpecification",[\w$]+\);/
    ],
    [
        'BattleChatHudComponent',
        4,
        /function\(\)\{var [\w$]+;switch\(this\.[\w$]+=[\w$]+\(this\.[\w$]+\(\)\),this\.[\w$]+=[\w$]+\(this\.[\w$]+\(\)\),[\w$]+\(this\)\.[\w$]+\)\{case 0:case 1:[\w$]+=new [\w$]+\([\w$]+\(\),0,1\);break;case 2:[\w$]+=new [\w$]+\([\w$]+\(\),0,0\);break;default:[\w$]+\(\)\}var [\w$]+=[\w$]+,[\w$]+=this\.[\w$]+\(\)\.[\w$]+\(\),[\w$]+=[\w$]+\(this\),[\w$]+=function\([\w$]+\)\{var [\w$]+=[\w$]+\.[\w$]+;if\(null!=[\w$]+\)return [\w$]+;[\w$]+\("atlases"\)\}/
    ],
    [
        'Body',
        -1,
        /function [\w$]+\([\w$]+,[\w$]+,[\w$]+\)\{[\w$]+\(\),this\.[\w$]+=[\w$]+,this\.[\w$]+=[\w$]+,this\.[\w$]+=0,this\.[\w$]+=null,this\.[\w$]+=null,this\.[\w$]+=!0,this\.[\w$]+=!1,this\.[\w$]+=0,this\.[\w$]+=!1,this\.[\w$]+=!1,this\.[\w$]+=new [\w$]+,this\.[\w$]+=[\w$]+,this\.[\w$]+=1,this\.[\w$]+=new [\w$]+,this\.[\w$]+=new [\w$]+,this\.[\w$]+=new [\w$]+,this\.[\w$]+=null,this\.[\w$]+=new [\w$]+,this\.[\w$]+=[\w$]+\(\),this\.[\w$]+=[\w$]+\(\),this\.[\w$]+=[\w$]+\(\),this\.[\w$]+=[\w$]+\(\),this\.[\w$]+=[\w$]+\(\),this\.[\w$]+=[\w$]+\(\),this\.[\w$]+=new [\w$]+,this\.[\w$]+=new [\w$]+,this\.[\w$]+=1\/this\.[\w$]+,[\w$]+\(this\.[\w$]+,this\.[\w$]+\)\}/
    ],
    [
        'BodyState',
        -1,
        /function [\w$]+\(\)\{this\.[\w$]+=[\w$]+\(\),this\.[\w$]+=new [\w$]+,this\.[\w$]+=[\w$]+\(\),this\.[\w$]+=[\w$]+\(\)\}/
    ],
    [
        'AlternativaLogger',
        -1,
        /function [\w$]+\(\)\{[\w$]+=this,this\.[\w$]+=new [\w$]+,this\.[\w$]+=[\w$]+\(\),this\.[\w$]+=[\w$]+\(\)\}/
    ],
    [
        'ModelsRegistryImpl',
        4,
        /throw [\w$]+\("Constructor codec not found for model "\+[\w$]+\([\w$]+\)\);/
    ],
    [
        'GameMode',
        -1,
        /function [\w$]+\(\)\{[\w$]+\(\),[\w$]+\.[\w$]+\(this\),this\.[\w$]+=[\w$]+\([\w$]+\([\w$]+\)\),this\.[\w$]+=new [\w$]+,this\.[\w$]+=new [\w$]+,this\.[\w$]+=[\w$]+\(\),this\.[\w$]+=this\.[\w$]+,this\.[\w$]+=new [\w$]+,this\.[\w$]+=this\.[\w$]+,this\.[\w$]+=new [\w$]+,this\.[\w$]+=[\w$]+\(\)\.[\w$]+,this\.[\w$]+=new [\w$]+,this\.[\w$]+=new [\w$]+,this\.[\w$]+=new [\w$]+,this\.[\w$]+=null,this\.[\w$]+=null,this\.[\w$]+=null,this\.[\w$]+=!1,[\w$]+\(\),this\.[\w$]+=-1,this\.[\w$]+=0,this\.[\w$]+=[\w$]+\(\)\}/
    ],
    [
        'LocalTankStateServerSenderComponent',
        -1,
        /function [\w$]+\(\)\{[\w$]+\(\),[\w$]+\.[\w$]+\(this\),this\.[\w$]+=!1,this\.[\w$]+=null,this\.[\w$]+=!1,this\.[\w$]+=!1,this\.[\w$]+=0,this\.[\w$]+=[\w$]+\([\w$]+\(\),[\w$]+\(\),[\w$]+\(\),[\w$]+\(\)\),this\.[\w$]+=[\w$]+\([\w$]+\(\),[\w$]+\(\),[\w$]+\(\),[\w$]+\(\)\),this\.[\w$]+=0,this\.[\w$]+=!1,this\.[\w$]+=!1\}/
    ],
    [
        'World',
        -1,
        /function [\w$]+\([\w$]+,[\w$]+,[\w$]+,[\w$]+\)\{[\w$]+\(\),[\w$]+=[\w$]+===[\w$]+\?new [\w$]+\(new [\w$]+\):[\w$]+,this\.[\w$]+=[\w$]+,this\.[\w$]+=[\w$]+,this\.[\w$]+=[\w$]+,this\.[\w$]+=[\w$]+,this\.[\w$]+=new [\w$]+\([\w$]+\([\w$]+\),null\),this\.[\w$]+=[\w$]+\(\),this\.[\w$]+=0,this\.[\w$]+=new [\w$]+,this\.[\w$]+=new [\w$]+,this\.[\w$]+=[\w$]+\(\[\]\),this\.[\w$]+=[\w$]+\(\),this\.[\w$]+=new [\w$]+,this\.[\w$]+=this\.[\w$]+,this\.[\w$]+=1,this\.[\w$]+=1,this\.[\w$]+=0,this\.[\w$]+=!0,this\.[\w$]+=!1,this\.[\w$]+=!1,this\.[\w$]+=0,this\.[\w$]+=[\w$]+\(\),this\.[\w$]+=new [\w$]+,this\.[\w$]+=new [\w$]+;var [\w$]+,[\w$]+,[\w$]+=this\.[\w$]+\.[\w$]+\(\);this\.[\w$]+=new [\w$]+\([\w$]+,\([\w$]+=this,\([\w$]+=function\([\w$]+\)\{return [\w$]+\.[\w$]+\([\w$]+\),[\w$]+\(\)\}\)\.callableName="removeObject"/
    ],
    [
        'GetPlayerId',
        -1,
        /function [\w$]+\(\)\{[\w$]+\(\),this\.[\w$]+=new [\w$]+\(0,0\),this\.[\w$]+=[\w$]+\(\)\.[\w$]+\}/
    ],
    [
        'GetTeamQuery',
        -1,
        /function [\w$]+\(\)\{[\w$]+=this,this\.[\w$]+=[\w$]+\(\),this\.[\w$]+=[\w$]+\(\)\.[\w$]+\([\w$]+\(this\)\)\}/
    ],
    [
        'Store',
        -1,
        /function [\w$]+\([\w$]+,[\w$]+,[\w$]+\)\{[\w$]+=[\w$]+===[\w$]+\?\[\]:[\w$]+,this\.[\w$]+=[\w$]+,this\.[\w$]+=new [\w$]+,this\.[\w$]+=null;for\(var [\w$]+,[\w$]+,[\w$]+=\([\w$]+=this,[\w$]+=function\([\w$]+\)\{return function\([\w$]+,[\w$]+\)\{[\w$]+\.[\w$]+=[\w$]+,[\w$]+\.[\w$]+=[\w$]+\.[\w$]+\([\w$]+,[\w$]+\.[\w$]+\);for\(var [\w$]+=[\w$]+\.[\w$]+\.[\w$]+\(\);[\w$]+\.[\w$]+\(\);\)[\w$]+\.[\w$]+\(\)\.[\w$]+\([\w$]+\);return [\w$]+\}\([\w$]+,[\w$]+\)\},[\w$]+\.callableName="invokeReducer"/
    ]
];
