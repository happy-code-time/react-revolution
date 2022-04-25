import React from 'react';

import uuid from '../functions/uuid';
import PropsCheck from '../functions/PropsCheck';
import isString from '../functions/isString';
import isFunction from '../functions/isFunction';
import isNumber from '../functions/isNumber';
import isArray from '../functions/isArray';

class Icon extends React.Component< { [key: string]: any }, { [key: string]: any }> {

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
            uuid: uuid(),
            /**
             * User
             */
            
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Icon',
            
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
        };
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck([ 'addClass', 'defaultClass', 'id','callback', 'displayTabs', 'renderItems', 'translations', 'custom', 'itemsPerLine', 'noData'], props, state)) {
            return {
                
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Icon',
                
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
            };
        }

        return null;
    }

    /**
     * @return {void}
     */
    componentDidMount(): void {


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
     * 
     * @return {void}
     */
    callback(event, icon) {
        const { callback } = this.state;

        if (callback) {
            (callback)(event, icon);
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
                        className='icon'
                        onClick={(e) => this.callback(e,i)}
                    >
                        {
                            i
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
                    onClick={(e) => this.callback(e,i)}
                >
                    <span className='icon'>
                        {
                            i
                        }
                    </span>
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
                className='' 
                
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

                                    let iconsCls = (iconsType == title) ? `tab active` : 'tab';

                                    if (i == renderItems.length - 1) {
                                        iconsCls += ' last';
                                    }

                                    return (
                                        <div
                                            className={iconsCls}
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

export default Icon;