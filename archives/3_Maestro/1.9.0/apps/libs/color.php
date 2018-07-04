<?php
/**
 * Wrapper holding all smart color handling functions and variables 
 *
 * @package     Maestro Server-Side Framework
 * @version     1.0.0
 * @author      i2tm Labs http://i2tmlabs.com
 * @copyright   Copyright (C) 2013 i2tm Labs
 * @license     Private
 *
 **/
defined('_MEXEC') or die('Restricted Access.');

/**
 *
R		G		B		Hex Value
Color
0		0		0		000000	Black
0		0		255		0000FF	Blue
0		255		0		00FF00	Green
0		255		255		00FFFF	Cyan

64		64		64		404040	Dark Grey

128		0		128		800080	Purple
128		128		128		808080	Grey
128		128		255		8080FF	Bright Blue
128		255		128		80FF80	Bright Green

192		192		192		C0C0C0	Bright Grey

255		0		0		FF0000	Red
255		128		0		ff8000	Orange
255		255		0		FFFF00	Yellow
255		0		255		FF00FF	Magenta
255		128		128		FF8080	Bright Red
255		128		192		FF80C0	Pink
255		255		255		FFFFFF	White
 
Operation		Formula					Effect
Negative		255-C					Returns the opposite color, for example white becomes black, red becomes cyan, ...
Darken			C/p or C-p				Divide the color though some constant (larger than 1), or subtract a constant from it, to make it darker.
Brighten		C*p or C+p				Multiply the color by some constant (larger than 1), or add a constant to it, to make it brighter.
Grey scale		(R+G+B)/3				Calculate the average of the 3 channels to get a grey color with the same brightness.
Remove Channel	R=0, G=0 and/or B=0		By setting one or more channels to 0, you completely remove that color component from the picture.
Swap Channels	R=G, G=R, ...			Swap the values of two color channels to get an image with a completely different color.
 
 */
abstract class MaestroColor
{
	public static $COLORS = array(
		'Black'=>array(0,0,0),
		'Very Dark Red'=>array(64,0,0),		
		'Very Dark Green'=>array(0,64,0),		
		'Very Dark Blue'=>array(0,0,64),		
		'Very Dark Yellow'=>array(64,64,0),		
		'Very Dark Orange'=>array(128,64,0),		
		'Very Dark Cyan'=>array(0,64,64),		
		'Very Dark Purple'=>array(64,0,64),		
		'Very Dark Grey'=>array(64,64,64),		

		'Dark Red'=>array(128,0,0),		
		'Dark Green'=>array(0,128,0),		
		'Dark Blue'=>array(0,0,128),		
		'Dark Yellow'=>array(128,128,0),		
		'Dark Orange'=>array(192,92,32),		
		'Dark Cyan'=>array(0,128,128),		
		'Dark Purple'=>array(128,0,128),		
		'Dark Grey'=>array(128,128,128),		
			
		'Red'=>array(192,0,0),		
		'Green'=>array(0,192,0),		
		'Blue'=>array(0,0,192),		
		'Yellow'=>array(192,192,0),		
		'Orange'=>array(255,128,0),		
		'Cyan'=>array(0,192,192),		
		'Purple'=>array(192,0,192),		
		'Grey'=>array(192,192,192),		
			
		'Bright Red'=>array(255,0,0),		
		'Bright Green'=>array(0,255,0),		
		'Bright Blue'=>array(0,0,255),		
		'Bright Yellow'=>array(255,255,0),		
		'Bright Orange'=>array(255,191,128),		
		'Bright Cyan'=>array(0,255,255),		
		'Bright Purple'=>array(255,0,255),	
		'White'=>array(255,255,255)			
	);
           
	//hold all layouts in folder        
	public static $THEMES = array(
		//'themename'=>array(foreground,background),
		'default'=>array(array(127,127,127),array(255,255,255)),
		'black'=>array(array(64,64,64),array(0,0,0)),
		'blue'=>array(array(0,0,255),array(200,200,200)),
		'cyan'=>array(array(0,192,255),array(200,225,250)),
		'green'=>array(array(0,255,0),array(220,230,220)),
		'lavender'=>array(array(96,64,128),array(127,127,127)),
		'orange'=>array(array(255,128,0),array(250,230,210)),
		'pink'=>array(array(240,220,230),array(255,255,255)),
		'purple'=>array(array(150,0,255),array(255,255,255)),
		'red'=>array(array(255,0,0),array(255,255,255)),
		'tan'=>array(array(220,160,120),array(255,255,255)),
		'teal'=>array(array(64,128,96),array(255,255,255)),
		'yellow'=>array(array(192,192,0),array(255,255,255))
	);
		   
	public static function getThemeColors($theme) {
		if (array_key_exists($theme,MaestroColor::$THEMES))
			return MaestroColor::$THEMES[$theme];
		else
			return MaestroColor::$THEMES['default'];
	}
	
    public static function hex2rgb($hex, $str = false)
    {
        $hex = str_replace("#", "", $hex);
        
        if (strlen($hex) == 3) {
            $r = hexdec(substr($hex, 0, 1) . substr($hex, 0, 1));
            $g = hexdec(substr($hex, 1, 1) . substr($hex, 1, 1));
            $b = hexdec(substr($hex, 2, 1) . substr($hex, 2, 1));
        } else {
            $r = hexdec(substr($hex, 0, 2));
            $g = hexdec(substr($hex, 2, 2));
            $b = hexdec(substr($hex, 4, 2));
        }
        $rgb = array(
            $r,
            $g,
            $b
        );
        if ($str)
            return implode(",", $rgb);
        else // returns the rgb values separated by commas
            return $rgb; // returns an array with the rgb values
    }
    
    public static function rgb2hex($rgb)
    {
        $hex = "#";
        $hex .= str_pad(dechex($rgb[0]), 2, "0", STR_PAD_LEFT);
        $hex .= str_pad(dechex($rgb[1]), 2, "0", STR_PAD_LEFT);
        $hex .= str_pad(dechex($rgb[2]), 2, "0", STR_PAD_LEFT);
        
        return $hex; // returns the hex value including the number sign (#)
    }
	
	/**
	0		0		0		Black		
	64		0		0		Very Dark Red
	0		64		0		Very Dark Green
	0		0		64		Very Dark Blue
	64		64		0		Very Dark Yellow
	0		64		64		Very Dark Cyan
	64		0		64		Very Dark Purple
	64		64		64		Very Dark Grey
	
	128		0		0		Dark Red
	0		128		0		Dark Green
	0		0		128		Dark Blue
	128		128		0		Dark Yellow
	0		128		128		Dark Cyan
	128		0		128		Dark Purple
	128		128		128		Dark Grey
	
	192		0		0		Red
	0		192		0		Green
	0		0		192		Blue
	192		192		0		Yellow
	0		192		192		Cyan
	192		0		192		Purple
	192		192		192		Grey
	
	255		0		0		Bright Red
	0		255		0		Bright Green
	0		0		255		Bright Blue
	255		255		0		Bright Yellow
	0		255		255		Bright Cyan
	255		0		255		Bright Purple
	255		255		255		White		
	*/
	function hslToHuman($h, $s, $l) {

		$colors = array();

		// Gray
		if ($s <= 10 && (9 <= $l && $l <= 90)) {$colors[] = "gray";}
		$l_var = $s / 16;
		// White
		$white_limit = 93;
		if (($white_limit + $l_var) <= $l && $l <= 100) {$colors[] = "white";}
		// Black
		$black_limit = 9;
		if (0 <= $l && $l <= ($black_limit - $l_var)) {$colors[] = "black";}
		// If we have color-less colours stop here
		if (sizeof($colors) > 0) {return $colors;}
		// Red
		if (($h <= 8 || $h >= 346)) {$colors[] = "red";}
		// Orange && Brown
		// TODO

		// Yellow
		if (40 <= $h && $h <= 65) {$colors[] = "yellow";}
		// Green
		if (65 <= $h && $h <= 170) {$colors[] = "green";}
		// Blue
		if (165 <= $h && $h <= 260) {$colors[] = "blue";}
		// Pink && Purple
		// TODO
		return $colors;
	}	
	
}
?>