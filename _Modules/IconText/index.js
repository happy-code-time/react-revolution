import React from 'react';
import uuid from '../../_Functions/uuid';
import PropsCheck from '../internalFunctions/PropsCheck';
import isString from '../../_Functions/isString';
import isFunction from '../../_Functions/isFunction';
import isNumber from '../../_Functions/isNumber';
import isArray from '../../_Functions/isArray';
import isObject from '../../_Functions/isObject';

class IconText extends React.Component
{

    constructor(props) {
        super(props);
        this.callback = this.callback.bind(this);
        this.changeTab = this.changeTab.bind(this);

        this.state = {
            /**
             * App
             */
            icons: {
                'Smileys':
                {
                    title: 'Smileys',
                    data: [
                        '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '☹', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '😳', '🤪', '😵', '😡', '😠', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🤠', '🤡', '🤥', '🤫', '🤭', '🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '🤖', '💩',
                    ]
                },
                'Peoples':
                {
                    title: 'Peoples',
                    data: [
                        "👦", "👶", "👧", "👨", "👩", "👴", "👵", "👾", "👨‍⚕️", "👩‍⚕️", "👨‍🎓", "👩‍🎓", "👨‍⚖️", "👩‍⚖️", "👨‍🌾", "👩‍🌾", "👨‍🍳", "👩‍🍳", "👨‍🔧", "👩‍🔧", "👨‍🏭", "👩‍🏭", "👨‍💼", "👩‍💼", "👨‍🔬", "👩‍🔬", "👨‍💻", "👩‍💻", "👨‍🎤", "👩‍🎤", "👨‍🎨", "👩‍🎨", "👨‍✈️", "👩‍✈️", "👨‍🚀", "👩‍🚀", "👨‍🚒", "👩‍🚒", "👮", "👮‍♂️", "👮‍♀️", "🕵", "🕵️‍♂️", "🕵️‍♀️", "💂", "💂‍♂️", "💂‍♀️", "👷", "👷‍♂️", "👷‍♀️", "🤴", "👸", "👳", "👳‍♂️", "👳‍♀️", "👲", "🧕", "🧔", "👱", "👱‍♂️", "👱‍♀️", "🤵", "👰", "🤰", "🤱", "👼", "🎅", "🤶", "🧙‍♀️", "🧙‍♂️", "🧚‍♀️", "🧚‍♂️", "🧛‍♀️", "🧛‍♂️", "🧜‍♀️", "🧜‍♂️", "🧝‍♀️", "🧝‍♂️", "🧞‍♀️", "🧞‍♂️", "🧟‍♀️", "🧟‍♂️", "🙍", "🙍‍♂️", "🙍‍♀️", "🙎", "🙎‍♂️", "🙎‍♀️", "🙅", "🙅‍♂️", "🙅‍♀️", "🙆", "🙆‍♂️", "🙆‍♀️", "💁", "💁‍♂️", "💁‍♀️", "🙋", "🙋‍♂️", "🙋‍♀️", "🙇", "🙇‍♂️", "🙇‍♀️", "🤦", "🤦‍♂️", "🤦‍♀️", "🤷", "🤷‍♂️", "🤷‍♀️", "💆", "💆‍♂️", "💆‍♀️", "💇", "💇‍♂️", "💇‍♀️", "🚶", "🚶‍♂️", "🚶‍♀️", "🏃", "🏃‍♂️", "🏃‍♀️", "💃", "🕺", "👯", "👯‍♂️", "👯‍♀️", "🧖‍♀️", "🧖‍♂️", "🕴", "🗣", "👤", "👥", "👫", "👬", "👭", "💏", "👨‍❤️‍", "👩‍❤️‍", "💑", "👪", "👩‍👩‍", "👨‍👦", "👨‍👧", "👩‍👦"
                    ]
                },
                'Animals':
                {
                    title: 'Animals',
                    data: [
                        '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '💥', '🐵', '🐒', '🦍', '🐶', '🐕', '🐩', '🐺', '🦊', '🐱', '🐈', '🦁', '🐯', '🐅', '🐆', '🐴', '🐎', '🦄', '🦓', '🐮', '🐂', '🐃', '🐄', '🐷', '🐖', '🐗', '🐽', '🐏', '🐑', '🐐', '🐪', '🐫', '🦒', '🐘', '🦏', '🐭', '🐁', '🐀', '🐹', '🐰', '🐇', '🐿', '🦔', '🦇', '🐻', '🐨', '🐼', '🐾', '🦃', '🐔', '🐓', '🐣', '🐤', '🐥', '🐦', '🐧', '🕊', '🦅', '🦆', '🦉', '🐸', '🐊', '🐢', '🦎', '🐍', '🐲', '🐉', '🦕', '🦖', '🐳', '🐋', '🐬', '🐟', '🐠', '🐡', '🦈', '🐙', '🐚', '🦀', '🦐', '🦑', '🐌', '🦋', '🐛', '🐜', '🐝', '🐞', '🦗', '🕷', '🕸', '🦂',
                    ]
                },
                'Plants':
                {
                    title: 'Plants',
                    data: [
                        '💐', '🌸', '💮', '🏵', '🌹', '🥀', '🌺', '🌻', '🌼', '🌷', '🌱', '🌲', '🌳', '🌴', '🌵', '🌾', '🌿', '☘', '🍀', '🍁', '🍂', '🍃', '🍄', '🌰',
                    ]
                },
                'Nature':
                {
                    title: 'Nature',
                    data: [
                        '🌍', '🌎', '🌏', '🌐', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌙', '🌚', '🌛', '🌜', '☀', '🌝', '🌞', '⭐', '🌟', '🌠', '☁', '⛅', '⛈', '🌤', '🌥', '🌦', '🌧', '🌨', '🌩', '🌪', '🌫', '🌬', '🌈', '☔', '⚡', '❄', '☃', '⛄', '☄', '🔥', '💧', '🌊', '🎄', '✨', '🎋', '🎍',
                    ]
                },
                'Food':
                {
                    title: 'Food',
                    data: [
                        '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🥝', '🍅', '🥥', '🥑', '🍆', '🥔', '🥕', '🌽', '🌶', '🥒', '🥦', '🥜', '🍞', '🥐', '🥖', '🥨', '🥞', '🧀', '🍖', '🍗', '🥩', '🥓', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🌯', '🍳', '🍲', '🥣', '🥗', '🍿', '🥫', '🍱', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🍡', '🥟', '🥠', '🥡', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🥧', '🍫', '🍬', '🍭', '🍮', '🍯', '🍼', '🥛', '☕', '🍵', '🍶', '🍾', '🍷', '🍸', '🍹', '🍺', '🍻', '🥂', '🥃', '🥤', '🥢', '🍽', '🍴', '🥄',
                    ]
                },
                'Activity':
                {
                    title: 'Activity',
                    data: [
                        '🏇', '⛷', '🏂', '🧗‍♀', '🧗‍♂', '🧘‍♀', '🧘‍♂', '🏌', '🏌️‍', '🏌️‍', '🏄', '🏄‍♂', '🏄‍♀', '🚣', '🚣‍♂', '🚣‍♀', '🏊', '🏊‍♂', '🏊‍♀', '⛹', '⛹️‍♂', '⛹️‍♀', '🏋', '🏋️‍', '🏋️‍', '🚴', '🚴‍♂', '🚴‍♀', '🚵', '🚵‍♂', '🚵‍♀', '🤸', '🤽‍♂', '🤽‍♀', '🤾', '🤾‍♂', '🤾‍♀', '🤹', '🤹‍♂', '🤹‍♀', '🎪', '🎗', '🎟', '🎫', '🎖', '🏆', '🏅', '🥇', '🥈', '🥉', '⚽', '⚾', '🏀', '🏐', '🏈', '🏉', '🎾', '🎳', '🏏', '🏑', '🏒', '🏓', '🏸', '🥊', '🥋', '⛳', '⛸', '🎣', '🎽', '🎿', '🛷', '🥌', '🎯', '🎱', '🎮', '🎰', '🎲', '🎭', '🎨', '🎼', '🎤', '🎧', '🎷', '🎸', '🎹', '🎺', '🎻', '🥁', '🎬', '🏹',
                    ]
                },
                'Travel':
                {
                    title: 'Travel',
                    data: [
                        '🏖', '🏎', '🏍', '🗾', '🏔', '⛰', '🌋', '🗻', '🏕', '🏜', '🏝', '🏞', '🏟', '🏛', '🏗', '🏘', '🏚', '🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏯', '🏰', '💒', '🗼', '🗽', '⛪', '🕌', '🕍', '⛩', '🕋', '⛲', '⛺', '🌁', '🌃', '🏙', '🌄', '🌅', '🌆', '🌇', '🌉', '🌌', '🎠', '🎡', '🎢', '🚂', '🚃', '🚄', '🚅', '🚆', '🚇', '🚈', '🚉', '🚊', '🚝', '🚞', '🚋', '🚌', '🚍', '🚎', '🚐', '🚑', '🚒', '🚓', '🚔', '🚕', '🚖', '🚗', '🚘', '🚚', '🚛', '🚜', '🚲', '🛴', '🛵', '🚏', '🛤', '⛽', '🚨', '⛵', '🚤', '🛳', '⛴', '🛥', '🚢', '✈', '🛩', '🛫', '🛬', '💺', '🚁', '🚟', '🚠', '🚡', '🛰', '🚀', '🛸', '⛱', '🎆', '🎇', '🎑', '🗿', '🛂', '🛃', '🛄', '🛅',
                    ]
                },
                'Objects':
                {
                    title: 'Objects',
                    data: [
                        '💎', '👓', '🕶', '👔', '👕', '👖', '🧣', '🧤', '🧥', '🧦', '👗', '👘', '👙', '👚', '👛', '👜', '👝', '🎒', '👞', '👟', '👠', '👡', '👢', '👑', '👒', '🎩', '🎓', '🧢', '⛑', '💄', '💍', '🌂', '☂', '💼', '☠', '🛀', '🛌', '💌', '💣', '🚥', '🚦', '🚧', '⚓', '🕳', '🛍', '📿', '🔪', '🏺', '🗺', '💈', '🛢', '🛎', '⌛', '⏳', '⌚', '⏰', '⏱', '⏲', '🕰', '🌡', '🎈', '🎉', '🎊', '🎎', '🎏', '🎐', '🎀', '🎁', '🔮', '🕹', '🖼', '🎙', '🎚', '🎛', '📻', '📱', '📲', '☎', '📞', '📟', '📠', '🔋', '🔌', '💻', '🖥', '🖨', '⌨', '🖱', '🖲', '💽', '💾', '💿', '📀', '🎥', '🎞', '📽', '📺', '📷', '📸', '📹', '📼', '🔍', '🔎', '🕯', '💡', '🔦', '🏮', '📔', '📕', '📖', '📗', '📘', '📙', '📚', '📓', '📃', '📜', '📄', '📰', '🗞', '📑', '🔖', '🏷', '💰', '💸', '💳', '✉', '📧', '📨', '📩', '📤', '📥', '📦', '📫', '📪', '📬', '📭', '📮', '🗳', '✏', '✎', '🖉', '✒', '🖋', '🖊', '🖌', '🖍', '📝', '📁', '📂', '🗂', '📅', '📆', '🗒', '🗓', '📇', '📈', '📉', '📊', '📋', '📌', '📍', '📎', '🖇', '📏', '📐', '✂', '🗃', '🗄', '🗑', '🔒', '🔓', '🔏', '🔐', '🔑', '🗝', '🔨', '⛏', '⚒', '🛠', '🗡', '⚔', '🔫', '🛡', '🔧', '🔩', '⚙', '🗜', '⚖', '🔗', '⛓', '⚗', '🔬', '🔭', '📡', '💉', '💊', '🚪', '🛏', '🛋', '🚽', '🚿', '🛁', '🚬', '⚰', '⚱', '💘', '❤', '💓', '💔', '💕', '💖', '💗', '💙', '💚', '💛', '🧡', '💜', '🖤', '💝', '💞', '💟', '❣', '💦', '💨', '💫', '🏁', '🚩', '🎌', '🏴', '🏳', '🏳️‍', '🏴‍☠'
                    ]
                },
                'Symbols':
                {
                    title: 'Symbols',
                    data: [
                        '👍', '👎', '💪', '🤳', '👈', '👉', '☝', '👆', '🖕', '👇', '✌', '🤞', '🖖', '🤘', '🖐', '✋', '👌', '✊', '👊', '🤛', '🤜', '🤚', '👋', '🤟', '✍', '👏', '👐', '🙌', '🤲', '🙏', '🤝', '💅', '👂', '👃', '⚕️', '👣', '👀', '👁', '🧠', '👅', '👄', '💋', '👁️‍', '💤', '💢', '💬', '🗯', '💭', '♨', '🛑', '🕛', '🕧', '🕐', '🕜', '🕑', '🕝', '🕒', '🕞', '🕓', '🕟', '🕔', '🕠', '🕕', '🕡', '🕖', '🕢', '🕗', '🕣', '🕘', '🕤', '🕙', '🕥', '🕚', '🕦', '🌀', '🃏', '🀄', '🎴', '🔇', '🔈', '🔉', '🔊', '📢', '📣', '📯', '🔔', '🔕', '🎵', '🎶', '🏧', '🚮', '🚰', '♿', '🚹', '🚺', '🚻', '🚼', '🚾', '⚠', '🚸', '⛔', '🚫', '🚳', '🚭', '🚯', '🚱', '🚷', '🔞', '☢', '☣', '🛐', '⚛', '🕉', '✡', '☸', '☯', '✝', '☦', '☪', '☮', '🕎', '🔯', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '⛎', '🔀', '🔁', '🔂', '▶', '⏩', '◀', '⏪', '🔼', '⏫', '🔽', '⏬', '⏹', '⏏', '🎦', '🔅', '🔆', '📶', '📳', '📴', '♻', '🔱', '📛', '🔰', '⭕', '✅', '☑', '✔', '✖', '❌', '❎', '➕', '➖', '➗', '➰', '➿', '〽', '✳', '✴', '❇', '‼', '⁉', '❓', '❔', '❕', '❗', '#️⃣', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '💯', '🔠', '🔡', '🔢', '🔣', '🔤', '🅰', '🆎', '🅱', '🆑', '🆒', '🆓', 'ℹ', '🆔', 'Ⓜ', '🆕', '🆖', '🅾', '🆗', '🅿', '🆘', '🆙', '🆚', '🈁', '🈂', '🈷', '🈶', '🈯', '🉐', '🈹', '🈚', '🈲', '🉑', '🈸', '🈴', '🈳', '㊗', '㊙', '🈺', '🈵', '▪', '▫', '◻', '◼', '◽', '◾', '⬛', '⬜', '🔶', '🔷', '🔸', '🔹', '🔺', '🔻', '💠', '🔲', '🔳', '⚪', '⚫', '🔴', '🔵',
                    ]
                },
                'Currency':
                {
                    title: 'Currency',
                    data: [
                        '💴', '💵', '💶', '💷', '$', '¢', '£', '€', '¥', '₹', '₽', '元', '¤', '₠', '₡', '₢', '₣', '₤', '₥', '₦', '₧', '₨', '₩', '₪', '₫', '₭', '₮', '₯', '₰', '₱', '₲', '₳', '₴', '₵', '₶', '₸', '₺', '₼', '৲', '৳', '૱', '௹', '฿', '៛', '㍐', '円', '圆', '圎', '圓', '圜', '원', '﷼', '＄', '￠', '￡', '￥', '￦',
                    ]
                },
                'Arrows':
                {
                    title: 'Arrows',
                    data: [
                        '⬆', '↗', '➡', '↘', '⬇', '↙', '⬅', '↖', '↕', '↔', '↩', '↪', '⤴', '⤵', '🔃', '🔄', '🔙', '🔚', '🔛', '🔜', '🔝', '➤', '➧', '←', '→', '↓', '↚', '↛', '↜', '↝', '↞', '↟', '↠', '↡', '↢', '↣', '↤', '↥', '↦', '↧', '↨', '↫', '↬', '↭', '↮', '↯', '↰', '↱', '↲', '↳', '↴', '↶', '↷', '↸', '↹', '↺', '↻', '↼', '↽', '↾', '↿', '⇀', '⇁', '⇂', '⇃', '⇄', '⇅', '⇆', '⇇', '⇈', '⇉', '⇊', '⇋', '⇌', '⇍', '⇎', '⇏', '↑', '⇕', '⇖', '⇗', '⇘', '⇙', '⇚', '⇛', '⇜', '⇝', '⇞', '⇟', '⇠', '⇡', '⇢', '⇣', '⇤', '⇥', '⇦', '⇧', '⇨', '⇩', '⇪', '⇫', '⇬', '⇭', '⇮', '⇯', '⇰', '⇱', '⇲', '⇳', '⇴', '⇵', '⇶', '⇷', '⇸', '⇹', '⇺', '⇻', '⇼', '⇽', '⇾', '⇿', '⟰', '⟱', '⟲', '⟳', '⟴', '⟵', '⟶', '⟷', '⟸', '⟹', '⟺', '⟻', '⟼', '⟽', '⟾', '⟿', '⤀', '⤁', '⤂', '⤃', '⤄', '⤅', '⤆', '⤇', '⤈', '⤉', '⤊', '⤋', '⤌', '⤍', '⤎', '⤏', '⤐', '⤑', '⤒', '⤓', '⤔', '⤕', '⤖', '⤗', '⤘', '⤙', '⤚', '⤛', '⤜', '⤝', '⤞', '⤟', '⤠', '⤡', '⤢', '⤣', '⤤', '⤥', '⤦', '⤧', '⤨', '⤩', '⤪', '⤫', '⤬', '⤭', '⤮', '⤯', '⤰', '⤱', '⤲', '⤳', '⤶', '⤷', '⤸', '⤹', '⤺', '⤻', '⤼', '⤽', '⤾', '⤿', '⥀', '⥁', '⥂', '⥃', '⥄', '⥅', '⥆', '⥇', '⥈', '⥉', '⥊', '⥋', '⥌', '⥍', '⥎', '⥏', '⥐', '⥑', '⥒', '⥓', '⥔', '⥕', '⥖', '⥗', '⥘', '⥙', '⥚', '⥛', '⥜',
                    ]
                },
                'Html':
                {
                    title: 'Html',
                    data: [
                        '¢', '£', '¤', '¥', '¦', '§', '¨', 'ª', '«', '¬', '­', '®', '¯', '°', '±', '²', '³', '´', 'Μ', '¶', '·', '¸', '¹', 'º', '»', '¼', '½', '¾', '¿', 'À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', '×', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'Þ', 'SS', 'À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', '÷', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'Þ', 'Ÿ', 'Ƒ', 'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', '•', '…', '′', '″', '‾', '⁄', '℘', 'ℑ', 'ℜ', '™', 'ℵ', '←', '↑', '→', '↓', '↔', '↵', '⇐', '⇑', '⇒', '⇓', '⇔', '∀', '∂', '∃', '∅', '∇', '∈', '∉', '∋', '∏', '∑', '−', '∗', '√', '∝', '∞', '∠', '∧', '∨', '∩', '∪', '∫', '∴', '∼', '≅', '≈', '≠', '≡', '≤', '≥', '⊂', '⊃', '⊄', '⊆', '⊇', '⊕', '⊗', '⊥', '⋅', '⌈', '⌉', '⌊', '⌋', '〈', '〉', '◊', '♠', '♣', '♥', '♦',
                    ]
                }
            },
            uuid: `${uuid()}`,
            /**
             * User
             */
            addClass: isString(props.addClass) ? props.addClass : '',
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'IconText',
            id: isString(props.id) ? props.id : '',
            iconsType: isString(props.iconsType) ? props.iconsType : 'Smileys',
            callback: isFunction(props.callback) ? props.callback : undefined,
            displayTabs: (typeof true == typeof props.displayTabs) ? props.displayTabs : true,
            renderItems: isArray(props.renderItems) ? props.renderItems : [
                'Smileys',
                'Peoples',
                'Animals',
                'Plants',
                'Nature',
                'Food',
                'Activity',
                'Travel',
                'Objects',
                'Symbols',
                'Currency',
                'Arrows',
                'Html'
            ],
            translations: isArray(props.translations) ? props.translations : undefined,
            custom: isArray(props.custom) ? props.custom : undefined,
            itemsPerLine: isNumber(props.itemsPerLine) && 0 < props.itemsPerLine ? props.itemsPerLine : 0,
            noData: props.noData ? props.noData : '',
            text: isObject(props.text) ? props.text : {},
            textDirection: isString(props.textDirection) && ['top', 'right', 'bottom', 'left'].includes(props.textDirection) ? props.textDirection : 'bottom',
            noText: !isNumber(props.noText) ? props.noText : '',
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) 
    {
        if (PropsCheck([ 'addClass', 'defaultClass', 'id','callback', 'displayTabs', 'renderItems', 'translations', 'custom', 'itemsPerLine', 'noData', 'text', 'textDirection', 'noText'], props, state)) 
        {
            return {
                addClass: isString(props.addClass) ? props.addClass : '',
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'IconText',
                id: isString(props.id) ? props.id : '',
                callback: isFunction(props.callback) ? props.callback : undefined,
                displayTabs: (typeof true == typeof props.displayTabs) ? props.displayTabs : true,
                renderItems: isArray(props.renderItems) ? props.renderItems : [
                    'Smileys',
                    'Peoples',
                    'Animals',
                    'Plants',
                    'Nature',
                    'Food',
                    'Activity',
                    'Travel',
                    'Objects',
                    'Symbols',
                    'Currency',
                    'Arrows',
                    'Html'
                ],
                translations: isArray(props.translations) ? props.translations : undefined,
                custom: isArray(props.custom) ? props.custom : undefined,
                itemsPerLine: isNumber(props.itemsPerLine) && 0 < props.itemsPerLine ? props.itemsPerLine : 0,
                noData: props.noData ? props.noData : '',
                text: isObject(props.text) ? props.text : {},
                textDirection: isString(props.textDirection) && ['top', 'right', 'bottom', 'left'].includes(props.textDirection) ? props.textDirection : 'bottom',
                noText: !isNumber(props.noText) ? props.noText : '',
            };
        }

        return null;
    }

    /**
     * @return {void}
     */
    componentDidMount()
    {
        const { custom, icons } = this.state;
        let addedItems = 0;

        if(isArray(custom) && custom.length){

            custom.map( object => {
                const { title, data } = object;
    
                if(isString(title) && isArray(data) && data.length){
                   
                    if(undefined == icons[title])
                    {
                        icons[title] = object;
                        addedItems += 1;
                    }
                }
            });

            if(addedItems)
            {
                this.setState({ icons });
            }
        }
    }

    /**
     * 
     * @param {MouseEvent} event 
     * @param {string} icon 
     * @param {int} loopIndex 
     * 
     * @return {void}
     */
    callback(event, icon, loopIndex) {
        const { callback, noText } = this.state;

        if (callback) {
            const text = this.isTextAvailable(loopIndex) ? this.getAvailableText(loopIndex) : noText;
            (callback)(event, icon, text);
        }
    }

    /**
     * @param {string} iconsType 
     * 
     * @return {void}
     */
    changeTab(iconsType) 
    {
        this.setState({ iconsType });
    }

    /**
     * @param {int} loopIndex 
     * 
     * @return {boolean}
     */
    isTextAvailable(loopIndex)
    {
        const { iconsType, text } = this.state;

        if(!isArray(text[iconsType]) || undefined === text[iconsType][loopIndex] || null === text[iconsType][loopIndex] || isArray(text[iconsType][loopIndex]))
        {
            return false;
        }

        return true;
    }

    /**
     * @param {int} loopIndex 
     * 
     * @return {null|string|HTMLElement|object}
     */
    getAvailableText(loopIndex)
    {
        const { iconsType, text, noText } = this.state;

        if(!isArray(text[iconsType]) || undefined === text[iconsType][loopIndex] || null === text[iconsType][loopIndex] || isArray(text[iconsType][loopIndex]))
        {
            if(noText)
            {
                return noText;
            }

            return null;
        }

        return text[iconsType][loopIndex];
    }

    getIcon(icon, index)
    {
        const { textDirection, noText } = this.state;

        icon = (
            <span className='icon'>
                {
                    icon
                }
            </span>
        );

        if(!this.isTextAvailable(index) && !noText)
        {
            return (
                <span className='flex icon-text'>
                    {
                        icon
                    }
                </span>
            );
        }

        let text = this.getAvailableText(index) || '';
        text = (
            <span className='text'>
                {
                    text
                }
            </span>
        );

        if('top' === textDirection)
        {
            return (
                <span className='flex flex-column icon-text top'>
                    {
                        text
                    }
                    {
                        icon
                    }
                </span>
            );
        }

        if('bottom' === textDirection)
        {
            return (
                <span className='flex flex-column icon-text bottom'>
                    {
                        icon
                    }
                    {
                        text
                    }
                </span>
            );
        }

        if('left' === textDirection)
        {
            return (
                <span className='flex icon-text left'>
                    {
                        text
                    }
                    {
                        icon
                    }
                </span>
            );
        }

        if('right' === textDirection)
        {
            return (
                <span className='flex icon-text right'>
                    {
                        icon
                    }
                    {
                        text
                    }
                </span>
            );
        }
    }
    /**
     * @return {array<HTMLElement>}
     */
    getDataJsx()
    {
        const { icons, noData, iconsType } = this.state;
        const jsx = [];

        if(!iconsType || undefined === icons[iconsType] || !isArray(icons[iconsType].data) || 0 === icons[iconsType].data.length)
        {
            if(noData)
            {
                jsx.push(noData);
            }

            return jsx;
        }

        if(!this.state.itemsPerLine)
        {
            icons[iconsType].data.map( (i, index) => {
                jsx.push(
                    <span
                        key={`${this.state.uuid}-${index}`}
                        className='icon-wrapper'
                        onClick={(e) => this.callback(e,i, index)}
                    >
                        {
                            this.getIcon(i, index)
                        }
                    </span>
                );
            });

            return jsx;
        }

        /**
         * User wisth to add custom count of "x" icons into single row
         */
        let tmp = [];

        icons[iconsType].data.map( (i, index) => 
        {
            tmp.push(
                <span
                    key={`${this.state.uuid}-${index}`}
                    className='icon-wrapper flex'
                    onClick={(e) => this.callback(e,i, index)}
                >
                    {
                        this.getIcon(i, index)
                    }
                </span>
            );

            if((tmp.length && index === icons[iconsType].data.length) || (index !== 0 && tmp.length === this.state.itemsPerLine))
            {
                jsx.push(
                    <div 
                        key={`${this.state.uuid}-${index}-${jsx.length}`}
                        className='flex row'
                    >
                        {
                            tmp
                        }
                    </div>
                );

                tmp = [];
            }
        });

        return jsx;
    }

    render() {
        const { addClass, id, defaultClass, icons, displayTabs, iconsType, renderItems, translations } = this.state;

        return (
            <div 
                className={`${defaultClass} ${addClass}`} 
                {...isString(id) && '' !== id && { id: id } }
            >
                {
                    displayTabs &&
                    <div className="tabs">
                        {
                            renderItems.map((name, i) => {
                                if (undefined !== icons[name]) {
                                    const { title } = icons[name];
                                    let displayTitle = icons[name].title;

                                    if(translations && undefined !== translations[name]){
                                        displayTitle = translations[name];
                                    }

                                    return (
                                        <div
                                            className={`tab user-select-none ${iconsType == title ? 'active' : 'inactive'} ${i == renderItems.length - 1 ? 'last' : ''}`}
                                            key={`${this.state.uuid}-${title}-${i}`}
                                            onClick={() => this.changeTab(title)}
                                        >
                                            {
                                                displayTitle
                                            }
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                }
                <div className="content">
                    {
                        this.getDataJsx()
                    }
                </div>
            </div>
        );
    }
}

export default IconText;