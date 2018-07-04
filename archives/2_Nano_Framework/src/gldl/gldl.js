/** 
 * @extends $m.df.Module
 * @class GLDL
 */
$m.df.GLDL = $m.df.Module.extend('$m.df.GLDL', {
	/** @lends $m.df.base */
},{

	device: null,
	/**
	 * Initializes the object.
	 * @method init
	 * @return MemberExpression
	 */
	init: function() {
		this._super('gldl','{NAME}','{VERSION}','{DISTRO}','{TIMESTAMP}');
		if (!mwdl.ready) {
			this.warn('Cannot create '+this.tag()+' module until the '+mwdl.tag()+' module is finished.');
		}
		this.device = new $m.df.Device();
		//nldr.que(this.dependentFiles(),true);
	},
	
	/*---/ Load Support Files/--------------------*/
	dependentFiles:function() {
		if (!this.Class.devMode) {
			//nldr.setBaseUrl(nldr.getPath('js',true));
			return ['js/game.min.js'];
		} else {
			//nldr.setBaseUrl((nldr.getPath('assets',true)+'src/'));
			return [
				'src/class.ai.js','src/class.enemy.js','src/class.fighter.js','src/class.weapon.js',
				'src/layer.game.js','src/layer.hud.js','src/layer.stars.js',
				'src/scene.game.js','src/scene.loading.js','src/scene.publisher.js',
				'src/system.prizedropper.js','src/tools.js',
				'src/physics.js','src/game.js'
			];
		}
	}
});
