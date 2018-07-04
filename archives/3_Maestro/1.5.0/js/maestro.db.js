/** 
 *  Db Interface for Maestro
 *
 * @file maestro.db.js (#7) in combine sequence.
 * FINALIZED
 */

 
/**
 * this interface provides an array of data and strings for Maestro
 *
 * @class I$Db
 * @extends I$Encoders
 * @memberof Maestro
 * @expose 
 */
extend(
	//What name of the interface are you extending?
	'I$Encoders',

	//What is the name of your new interface?
	'I$Db',
	
	/** @lends I$Encoders */
	{		
		toString:function(){return 'I$Db Class'},
		/** 
		 * This is an API so there can only be one instance.
		 *
		 * @property {number} maxTotalObjects
		 * @expose 
		 */
		maxTotalObjects:1,
		//===| Private Local Variables |===//
		/** @expose */
		db : []
	},
	/** @lends I$Encoders.prototype */
	{
		toString:function(){return 'I$Db Object';},
		//===| Private Local Variables |===//
		/** @expose */
		db : [],
		/**
		 * Interface Initialization method
		 * @expose
		 * @constructor init
		 */
		init:function ()
		{
			this['_super']();
		},
		//First run - Load Release version of JavaScript and Style-sheet if no Parameters
		//Initialize Object
		// setup:function() {		
			// this['_super']();			
			// this['db']=[
			// ['script','link','put','get','clk','msg','unknown','undefined','object','Array',
			// 'Error',
			// 'closed opacity20',
			// 'head',
			// 'tail',
			// 'cpanel',
			// 'cpTable',
			// 'tbody',
			// '<h1>&#98',
			// '</h1><h3>',
			// '</h3>',
			// 'div',
			// 'ul',
			// 'li',
			// 'common',
			// 'mLoader',
			// 'mView',
			// 'INFO',
			// 'text-info',
			// 'info-sign">',
			// 'WARN',
			// 'text-warning',
			// 'exclamation-sign">',
			// 'ERROR',
			// 'text-danger',
			// 'remove-sign">',
			// 'DEBUG',
			// 'text-default',
			// 'wrench">',
			// 'open opacity100',
			// 'Only Javascript and Stylesheets can be loaded local or remote.',
			// 'wrapper',
			// 'URL provided is invalid [',
			// 'function',
			// 'String',
			// 'Object',
			// 'html',
			// 'application',
			// 'document',
			// 'light',
			// 'neutral',
			// 'dark',
			// 'anonymous',
			// 'shortName',
			// 'ancestry',
			// 'What: ',
			// 'Where: ',
			// 'Local: [',
			// 'Params: [',
			// '-10000px',	
			// '\n\r',
			// 'Prototypal Layer',
			// 'cloudapp',
			// 'vanish',
			// 'appear'
			
			// ],
			// ['nano','.release','.debug','.js','.css'],
			// ['//cdn.i2tmlabs.com'],
			// ['__utm.gif?','Microsoft.XMLHTTP','application/javascript','text/css','stylesheet'],
			// [
			// '@font-face{font-family:"neuropol";src:url("http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/neuropol-webfont.eot");src:url("http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/neuropol-webfont.eot?#iefix") format("embedded-opentype"),url("http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/neuropol-webfont.woff") format("woff"),url("http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/neuropol-webfont.ttf") format("truetype"),url("http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/neuropol-webfont.svg#neuropol") format("svg");font-weight: normal;font-style: normal}@font-face{font-family:"ubuntu";src:url("http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/ubuntu-r-webfont.eot");src:url("http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/ubuntu-r-webfont.eot?#iefix") format("embedded-opentype"),url("http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/ubuntu-r-webfont.woff") format("woff"),url("http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/ubuntu-r-webfont.ttf") format("truetype"),url("http://cdn.i2tmlabs.com/content/i2tm/assets/fonts/ubuntu-r-webfont.svg#ubuntu") format("svg");font-weight: normal;font-style: normal}html,body,#wrapper{padding:0;margin:0;z-index:10}#cpanel{position:fixed;top:0;left:0;right:0;z-index:10003;background-color:#fff;color:#000;font-family:ubuntu;font-size:1em;padding:0;margin:0}#cpHead{width:100%;top:0;max-height:20px;background-color:#000;color:#f00;font-size:.75em;padding:0 24px 0 24px}#cpLog{position:absolute;bottom:0;top:21px;width:100%;border:0;overflow:auto;color:black;text-shadow:none;font-size:1em;text-align:left}#cpanel.open{bottom:0;visibility:visible}#cpanel.closed{height:20px}.cpText{vertical-align:top;font-size:1em;}.msgBox{position:fixed;top:10%;left:50%;width:300px;height:300px;text-align:center;margin-left:-150px;border:5px solid #888;box-shadow:0 10px 10px #ccc;background-color:#f5f5f5;z-index:10002;overflow:hidden}.deadCenter{position:fixed;top:22.5%;left:50%;width:320px;height:320px;text-align:center;margin-top:-160px;margin-left:-160px;border:5px solid #888;box-shadow:0 10px 10px #ccc;background-color:#f5f5f5;z-index:10002;overflow:hidden}.vanish{position:absolute;display:none;visibility:hidden;top:-10000}.appear{position:initial;display:initial;visibility:visible;top:initial}.opacity0{filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity:0;opacity:0;transition:opacity 1s linear}.opacity20{filter:alpha(opacity=20);-moz-opacity:.2;-khtml-opacity:.2;opacity:.2;transition:opacity 1s linear}.opacity40{filter:alpha(opacity=40);-moz-opacity:.4;-khtml-opacity:.4;opacity:.4;transition:opacity 1s linear}.opacity60{filter:alpha(opacity=60);-moz-opacity:.6;-khtml-opacity:.6;opacity:.6;transition:opacity 1s linear}.opacity80{filter:alpha(opacity=80);-moz-opacity:.8;-khtml-opacity:.8;opacity:.8;transition:opacity 1s linear}.opacity100{filter:alpha(opacity=100);-moz-opacity:1;-khtml-opacity:1;opacity:1;transition:opacity 1s linear}#mLoader {display: block;position: fixed;top: 0;left: 0;bottom: 0;right: 0;z-index: 10000;}#mView{font-family:"neuropol";position: absolute;margin: -30px -110px;top: 45%;left: 50%;width: 220px;height: 60px;list-style: none;text-align: center;padding: 0;z-index: 10001;}ul#mView li{background-color:#888;width:25px;height:20px;float:right;margin-right:6px;box-shadow:0 100px 20px rgba(0,0,0,0.2);border-radius:10px 10px}ul#mView h1,h3{color:#444!important;font-size:150%!important;text-decoration:none!important;text-shadow:none!important}@-webkit-keyframes loadbars{0%{height:1px;margin-top:25px}50%{height:50px;margin-top:0}100%{height:1px;margin-top:25px}}ul#mView li:first-child{-webkit-animation:loadbars 2.0s cubic-bezier(0.645,0.045,0.355,1) infinite 0s}ul#mView li:nth-child(2){-webkit-animation:loadbars 2.1s ease-in-out infinite -0.5s}ul#mView li:nth-child(3){-webkit-animation:loadbars 2.2s ease-in-out infinite -0.5s}ul#mView li:nth-child(4){-webkit-animation:loadbars 2.3s ease-in-out infinite -0.5s}ul#mView li:nth-child(5){-webkit-animation:loadbars 2.4s ease-in-out infinite -0.5s}ul#mView li:nth-child(6){-webkit-animation:loadbars 2.5s ease-in-out infinite -0.5s}ul#mView li:nth-child(7){-webkit-animation:loadbars 2.6s ease-in-out infinite -0.5s}',
			// [[33,'o'],[35,'r'],[37,'t'],[34,'s'],[36,'e'],[33,'a'],[34,'m']]
			// ],
			// [
			// [
			// "@media all {html {font-size:{FONTSIZE}px !important}#tail{display:none;visibility:hidden}}",
			// "@media screen and (max-device-width: {DEVICEWIDTH}px) {.mdw:before {content:'{DEVICEWIDTH}px'}}",
			// "@media only screen and (-webkit-min-device-pixel-ratio:{DPP}){.dpp:before{content:'{DPP}'}.dpi:before{content:'{DPI}'}html,body {font-size:{FONTPCT}% !important;}}"
			// ],
			// [2048,1920,1536,1440,1366,1280,1136,1025,960,768,720,640,480,320],
			// [1,1.3,1.5,2,3],
			// [96,124,144,192,288],
			// [100,100,100,100,100],
			// ['{FONTSIZE}','{DEVICEWIDTH}','{DPP}','{DPI}','{FONTPCT}'],
			// ['<div id="cpHead"><span class="pull-left">Maestro cPanel&nbsp;v</span><span id="msv">v0.0.0</span><span id="btn_cpanel" class="pull-right cpText glyphicon glyphicon-cog" onclick="M$.tgc(\'cpanel\');"></span></div><div id="cpLog"><table id="cpTable" class="table table-hover table-striped"><thead><tr><th>Type</th><th>Object:ID</th><th>Message</th></tr></thead><tbody></tbody></table></div>','<span class="glyphicon glyphicon-']
			// ],
			// [
			// 'copy', 'cut', 'paste',
			// 'beforeunload', 'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll',
			// 'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'online', 'offline', 'textInput',
			// 'abort', 'close', 'dragdrop', 'load', 'paint', 'reset', 'select', 'submit', 'unload'
			// ]
			// ];
			// this['db'] = this['enc'](this['db']);
			// this['db'] = this['dec'](this['db']);
			// this['Class']['db']=this['db'];
		// }
		//Setup is called before init(). Use this to prepare your interface.
		setup:function() {
			this['_super']();
			this['db'] = "W1sic2NyaXB0IiwibGluayIsInB1dCĖImdlĜĞmNsĔĤ1zZĕėnVē25vd24iLCJ1bmRlZmĒZWQĸĺvYmplY3ņĹJBcnJheSĞkVycm9ĕčiY2xvĄVkIG9wYWNpdHkyMĝėmhōŅŇJ0ůlėŢŎBhĽVƃĎƅUůJsZřĮRď2R5ČĎPGgxPţjOTgŇI8L2ƝPjxoMzķĹƦƨgzƟĤRŲiĞįƊďGkžjb21tǄƱĺtTŬhZGŜƙďVZpZXcžJTkZPǒdǐ4Ĝ1pĽZvǒaW5mbyĪǫduXĝ+ǒV0FSTƻƓleHQtĵFyĽŃĭğV4ŤxƇWF0ǫ9uLXűZĲcIjǉJFUlJPUǾĘĿȁȃǏFuȚǑŢŞVǇ3ZlȗșțȝȟERUJVRȊnȩȂtǏVmYXƉģĮdyń5jaFƚȧşwń4gb3ƆŤl0eTEwŷŚȕbŴgSmF2ɋNjŞlwĜƆĽQgU3ƗĐVzaǐĢHMgŤȭūJlūŦůĿZCBsǄNƇʓŧiBɑĀĴGUuǠ3ŖcHBlǙĞlVǼʓwŞ92ǫʑʓpcyBǦnZƇđŪFĂőĠǬjǡlvbȧlN0ɵȮȊk9iamVˆŸğh0bWĎőhʦʔǫʗˇˉɘRŉ3ȳɒċŢĐlnaȂžȮɌˎɯƾȬćȊɯuǄ55˝91ʸƼNoɞſTɯɇƒğȭŤʁųJƘŢV2hhdDogǸ̙ʩmU6I˙kʏ2ˁOʛbǒUGȆůĪ̬B̮ŢLɥɧDAʰHƤőcblxšĎUHJʟ9ɣĉʘBMɋlʩɘĦɞũɋBwǠ˾Ĉ̈ǒ͙ɚȑĕɢsWyJuůĳǒLŕlʀˡ2ȦƲȮǐidWǙ͵anMƥͪ3NzIͥͧIvƨNkˊ5pMɄǇ̱ăyɓǄ0iXSx̮l9fdXRtLĠǖj8žNˤȇ΂vZnQuWE1MSFȾU˙ɯʰGxpʉȓWȕƨp̛ɯzŎJʷ˴ő0Ǘ˛Ίz̆ĮˍeWxʩ̡ǗņΚΜIkBǮĲ0LWʽ̒7ŁȕǤɊĀǦŴ6ǵͩǗŜɞBˉɖiO΂yYzp̅mwoϴoųRw̬8ŉƖȖmŵǡāƎzΥNˉS9ǃϥ˭ƨВG0ŉȘī΢Ж2ǨbɄЧ5ĢX͊cŬsȗġŊЩαȮτ0ǵIpϽĆЀЂŞЅЇЉЋiЍŤRАРДWJЖĥЙЛ̀ϐǬϦ2РТɲХRЧзўƨЭΡавдōmзβń͌PyșϨpeϻKSϣ̊tɋQІĺͰяŀGʵ1ŧǐuųɶZVĎѵxЃфĺЈHЊЌЎыΥэsЕЗѓМ5іҞПyǡћФǗѡШˉЫѢЮѥ9гXеѩҩβĵ9ѩɶiѵѷʤѹXѻϴ3ǄŁмpLHϷCˡ˚0ųA6LyЛǏ4ēTſ˝ȏY;ͪ29ΤąҩĿЪQvaӖ˜Кˡ΂ʅMίş҆ʆˉ˖ЃŭǄwȄ2ViϬ҆CҞǡZȜikgϬȇȑ0Kϻ̔1Ҧ5бVԂksѤsԊĎ˳Rˎ̝ΉąΌiΎΐΣĐFΔΖ2ћӝ҆҅Ĝ9ΏΑƨFϔӹˎӑϤҞʸȕ϶έϹbC1ȵяԷϦnNШѯ˶ϷɟϺҋѶǮҼѺѼѐdĠԒϫӯǤՁ˱˳Q̥GĳŞ1ƇDtՃȸɣϙl̵˿Րϙ9QGѪɇɯjǗեѕϧʽ˝ƂɤʷĘӺ͹ӿҊϼϾсҎՒґғшҕьҢGюѐқbКҝҟјњУ΃ҦџӡЖ˫͸їdS1yѧжҳй͌ӄпϿЁևхҒчщЏҗ֎֐ёИ֓єНїҡң֙ѝ֜Ъѡ֟ցӌ֣֥ҰѨѪ֩0ѮѰǕѳՍһJҽҿѽ˝ʌǏ҂҄İ҇ɚփҌ֯ҐцҔъ֍ГҙяָҜѕОљ֎Ҥ֚ЦƨѠ֞ր֡׈֦Ҳӣ҆ӝҷדՏוՑӀӂmӄӆӈӊźӌHӎӐӒGӔӦӗϙhӚMӜӞΊӡͰαӥӧֺӪNӬӮϭӱ͹Ļ׃1ȗIӸӺӼĜӿձԒԅşԇȒԗ͸͉ԍ΢ԏǐԒԔЯԖϻԙԛoԝ΋΍ԯԣΓʸԧԩϭԬCԮԢӟԲŨԵҶѕԹ1ӚמHUtǙՀńJզՅՇNٞįӰԑČԄԆ˝عϻcȵn֫Ҩӣدǖ̙0իѸůw՗ϭԿz҇ƐT̞ĽŠٳsfW˛˝wҙşkŘwˆʤˡʧʩntŮWRkǫ5nOjA7ٳɑ2ĒڨڪeiǥĽȩ̝xMH0jƅƇ˖seՋĄɢȔuOѩѲǐkϽ˩c̝Ћťŀα6MդćWdЈۏϽotڥǝXg۔T̽ەM7ŊFɔ2ɐ͗ȮԿМŦcjoյѩmOӠĐŠ̬M̻ڪرԿϯڴϲةļɄ1۹ղۃ6Zڊxń07бFǝđȮzoېբŞdǦ۴wfSɳcEŻʐ7ĵlkǡۢMۤwǛt˜3ӎەtҽg۞ǐٽ˛ڨI̾gۨմa۬έİʒ1۱ŧ۴jە̽۹ֹŬy̬NmݏڄӽǱXŌ̬4΂WȳϽƆכǦmc۔CAѯʧ4I̼gMjЊȁڻƅMǄdܓŬʂ΢ǦĶ6ЕǄҍǡU݃͌ǡӞڰܩŬЋjIxʦ݂ܪܬƜۣ̽ܲďʤ۠I۔դĴ˖ɑmŦdЁ̛΢vݑˉݓۇƏůNrیȀɆĄ̚Ǐ93ۇĳĽކ܁ݛݝjFͰTܳϑϦȑħۘۆޣےR9IąڡЭԾՠ҅e2͊ЉˉڊЋȵʷڮ˔ϙŲ܅łʂяƐXݶɟھƉЗʕӫZHtoń՛Ȃ۔j͚ݵ΁BU߆ہȶŔƹʉг߈ǲۆɄŧդզȘѲ̣۔ݡtϽ0˿Șαş4ہϹۃσȕۇבۊیࠊoڸCކʀĠ̝ζࠦܩڮޕܮz̽ޒ7ʃVܽٿݎɧݭ޲ȪѹߢȚ4ށӹԫŜ۹ܜΦˊāńZٿi0xNTߺդޚJޜ6NĉݮHݒܫ̦M4OD݂Ŋ94ȸoʐĴܙ͛Dɦޒݱࡒweݪڼąơߘؗ2tnʱļmȃŤҮɞޝߐYԍjɉࡑtӏWŃǢڨɦݏݔӝШЯǮŬ޹źǖҁ؞ࠔɈǎEؤ׃ڞڠɞű˦bjpmĈŻZդܴܶޏuNSࠧǐࠩoࠫކޔܭ۔΄݁࠴ܼȚܾݎŶ࠻ɾ޳ࢁ࠿ހ̒ࡄ࢔ࡇܞࡉࢲӏɥ2ڹBࡡǅˡࡈڳƐϨࡍࡏɳࡓtࡕࡗ࡙ࣚI࡜ޫ࡞Cࡠࡢࡤ࠘ࡨࡪޥܚݯ࡯̿ࡱߺࡵŤɳ۹ŖŤࡼࡾɺѹӝ߯ࢅɱ࢈ࢊ߄ࢍ࢏Ȍ࢑ۿ࢔ʲǗ٧ۻ࢚h࢜ӢnࠔՔȭ͞oࠚŧڮࠝߋԥĄҮΡĿ۹ƹٶʔɋk6ڌȮ߄ʳࠍŊƂĈƗۇङכͰjܳɞ؏̺ݏܡS5ڜʨɋJݻ9ݽƹǈ6ڥŲđգtڤȘwԤ5ۇĒऺρ˞ܩߥǫό˰ɣTpशűŊϚࠢێpݦۄ߈ܢߕ۪ऺ5ڹեǫxϐXޝůxwʃẺ߫ɡ१0wKTsǇτࢍŭޯߣऱە঍݅ڒ˞ȴɠतɤܚ۹঑ŰওޞܳŞȭࠜۅۇঠࢨɬMXʇ˰йȆॴ҄ॶؾݲB՗Ƃǡࡅ˹б̚Kލ঒ų˒ݲAоǰȴ۝ϸࡺɢঝuݲখپړচৌ१o৏ी঴ɔؾݞݔɾϿǬॏݿࡁোইŘAޑʹ߉Эो9Υপও0ॹࢭϙॽॿϙংG঄৥জT0৲Ck7ϧ҃ڲ҃ܔ৛ऻi4ٿǰrԙǇԿ৚ॷݞٿӝڡফऱLjQܩ͉ƇՅ॔ˈࢪpਓؾݯԲʎݦVˡजլছ্TYࡳШϱĿ۳χɫBࡩShਦƗPਲঊঌ঎9ঐਘঢਛYਃW߳שϧৰৃӏڼګআ৽ৗɳত˾ধτߋੑবমɝܗńলेਿड़DসŁ঺ǐݔঽGিুডৃ9ࡢ৆Oৈɞ৊੖਱ৗࡢ৑ঘӷৼ੽ۆޟਈਔ਋ࡡয়ͫৢ॑ઃɣS২ʸˣǬōЯ৮əূŴڸ੩হԔ੭ۇˁাhী੟ৄܰঋ঍̃ੇચঔ੄গ˜ঙએঝxটੈ੒ܯਗ਼দतনઙੳ੠য੣ͣܢNǋǍɈĕ߲क़Nग़̱ड़ʛƿЛazࢦ΂ਢˉ۴ضl4ńਝމчݐۑΰ՝ݯڪࡥӌŬࠒiݐʤ࠷̬૬۝۟ǗۢࣸۿߝڻbǔǖҰݙϮ̳ϱऱϴՉԼՌք઼ࠛ੝̵ؗՅˉӇϐ߄ҽJ˲Wࡁ̦0zࣙݮCࡏܯࣥࣕݯQ1ܲ࣠ࡌ૯ࢼ࠭ܫࢿݯIࣈࣚ۹Żǲ̞ۚࣤࡳդħȘϦସϘ७ʛ˿Ĳժ࣊࠽ঀٽକGࢣɄʩीڡڣڥڧ૫ߝ૱Ǭ۠૴࡮ۿવ31ļCૅɉ͓ɐˣXࣦޯrZʤĴ୒ϧݒۼiࣰࡣନ࠯߸Ҋeդߴࢎ˲߷ষଵշǍ̜p̜ܸۗۙोଓ4٣ł୷՝Nęࣛ͊ࡴǱ̱Ό3ݨŷ২ەࣼݫଙ࣫଒Ŋ঄ŷwwL̼sŷ4yঋࣦ̊ޜஆܕĈʁऑࡰଝࡳH୙Ծଡ଼łĢʹƮΛƮ3t݋۳۵NDQċࢎ٣ݓǡȭ஁ࠌűeࠏܯUܱθǦĉŧɄਠ૞ǢǤǝŰŧɯथ޺ӲUhǫ1ग़ʤƀї࠼޴̙ǎ࢙௡޼௤Ā௧ſͫ0fUAد˔तϧtȀϨৠ1ʩ৪Ǆܕ۩ŝ3sܱୡ୵߶՝ভମࣜܝǦڳࣕݲ୲ںࠫVࣃ࠶ࣅ࠸௑࠳ڬȚĒȗۍۏfॄCజ࠵૮߁୺଑஄Ȅލܿ̅HhΟɌėǅWǫV3ਪࠟʷՅ߇̈ॻڗǰՁJਏҾ࠾Ύٳ௠ޣŉڢţЯ΄DI৏ʆʈ֟ǫMѹ˖॒ݡ஦̼ࢵਜج౥ەଡ஡A৏zU౨EpūŃłē΢ʍ੩zf఺ߐ1ఽݡీοоmҞa۰ʃƂʒg஦X঍ĵӺ݅ɢϧटĀ̛đ૘pʕ̪kఈʸݫਛ਩ǐͲ٢ǫஅ͗ċ੣౶ऺʍଛ஠ࢉ౻౽఼ాಂπ޺ȓಈđƐCƵKಎ௻ಒ߇ಕբࢩࢫಛఇɯŝyಠjѐūਬĄಥଔȴǹ౴Ȯಫ౸ଖಯʁ౼Ɖ౾ಀిుಅಸ݊ಉ಻gԉಿಐ௼ಓȑēಖ೅ಚఆಝ೉ಟ֥j΃೏ತ۞೓ನೖ੫౷Ŀ೚ਛ೜ಲ౿಴ೢಆಹಊ಼1ಾಏӹ೬ೂ೯ೄಘਤೇ೴Ȇ೶ਛў೺೑೼ಧ˫಩౵फ़೙ಮഄಱೞಳಁഉ೤ɔ಺ಋ2ഏೀ௽೮௥ಗਣೆೳಞೋ೷ʁഞͳഠ೔ണ೗ഥംധರೝ఻ഇബಃಷಇ೥ര಼3ള೫ುಔഔസಙഘ഼ೌZ΄ಣടದൃ೿೘േউനܢĖĀsଘyĎǯJdLˁzࢶĎǙ൲൴൭ĆĎĜൺ൵NC൸ͨ൳ඁŢƑ඀൭M൯ţSඊ൶ඃďඏΡǹͦāiհఃǏlhūˁԾসਐඡ૽چĈݝڟG৾5UU0laRX௦ࡴA௲௦̊௩Ҟૄ௩ռƖʷɟҙXऱळ܎t४ρłଷऻ࢛ाЪ1ߏŢකҀඝ࣫ܤ˖Ͱʛھɻীբஎ۠ǕŤ٢ࢾޖ࣫tȽǔJ௄VΚUȾSளࡳਁgeΕɇHݨŊɉ̊ʍ߲֕˭̬ݺREVWࢷNFǹlคܦ9ޒn౼ΘőA˝ũǫEɝĲۀѶϊʤŀଔʈ୒̦ܺൖവڴڳ෠ρുб૛ńӷথσ86e0RQ͈0ѲΕkʦӎ෺؂Ȁۺୈӣ6J஽EUFB9ๆ࢟ʧ಄ךطն෿௪͸7R๊Jܢd9ඣCxƕƗ෦ௌࠎ̤ิǞTlึଡߎJઑභ௴යٿ୘ߏΆࣁூgணǜŶඃࡐTM2஡E0ூA๺຀Nčڸjg஠࡮ڸϊ๺ݫ൷5ɳຆ΃YࡧDʸஞą஢๸ຎඌMȒͦzEணS4Ж࡮ࢵSw֥DNආsຕຊݲQ๺௄ຂॸčݔD̛ൻજຆܯ̽ຂɧ๽ݏຒwϟ̮ඩණතදනߩž๗คฆUจชฌసǒิึุ໔๘B๚̏໎0ඬUࢢUܢඊiƛƹdʛǖD̅ğૌSಣZϻƫxϔ̱ʢ୆ෂ΃PփʦƉԾࡊ࣡м+Tȑʩয়ǯBj̰ȭฮǮmѐێ෇Pٔ໾ȭ໼༞ༀܫ༄൰Ș2་dک৏C4w༜ॎܔu༠༱౴k༤ţɄǴߑͫͰϻūĦќ༷༆ʕԿ୿Јʓɴι࣋ԅťؿङࢂༀdۀĉoˤ˧݊ݹԂԽĥ߉ް༷TSҴG༩KC༩༱ฮn஧ȜȞƧ΂ڡ4+༯क़Yིҁƺʺࢰ໵ĥwǌ9ٸǶPҒؗߌ༵༷ƌƎƐփ༿༂ƶփ௉ƿUgྐĐಥŬ࢖IྒྷΓྕ٣য়Ĉʨ໺ƚƬȓ໹D48ųIིҒoP๪ؿU཮RྭྣaD5PŊŌŎ՝ࢷQྲྴॼྶຕǗຘۘl༯ȓྦྲyƫwʟܧŅྫƔǄੀj࿏ǡ͊߱kིٔ௩Ə܎ྦྷƨ໰Ȟƥ8मƇʛǃ̱ϔzཻདྷeཔབˊBnɫɶಉМஅ΅ěൻţਗŘĤ٫ɎĘƆٶംƄ˖เցഘ͠ޣ͕̅ࡩǬʼ̏ཛྷˤr͠Ԫ঻ǣ֏؞ʹĺ೴x࿫lɔ˽ǨŎിŢ݅V5޷Ӂɘ௿࿱ʜ࿅΄ဪӹ5ΡAž೔īڢĴĶျ͗ွ҃Քဟו၂Ѭěμ၄ȘͰȵ͔ĩĴ၍္žɑࠍ௎၆ฝ͊Đ˟ĺE৾܉࿕lSৡकіŐၞၠOၢU˖ȴȶʒŚRੁUĳɈSń၄˖kRŕˉ෮˪ˬїǒฃ9ࡑږZȢuŨ֎ũၤҞbีႁɇႃŢႅNQ΢ˎk҃ග৴ũႄEႆQ௭থˆ੭Ṟƀ౰ίđ႟Ū႖ႢNRթต҆EैตDʃ༕ӹႰĎ႗႙Ԛɵ͸౸̌Fɇ໘ဒڦ૝žၟ01BŎ໰௟Ƒၲၴဧ˫zၤȼၠGʖ̅0̄ငӯরზŹҶŁπ޼žॽ˛ႏɷҾž྄Šფ͖ӫǒ߱ŖȚɂूžဍȱ̱ʻၨJၖؤငՅͰǐ˘̇ٞmǥᄈİۻǎĺΡQ==";
			this['db'] = this.dec(this['db']);
			this['Class']['db']=this['db'];
		}
	},
	{
		/** @augments I$NAME */
		/*
		someInterfaceName:I$SomeInterface,
		...
		someInterfaceName:I$SomeInterface
		*/
	},
	['db']
);
