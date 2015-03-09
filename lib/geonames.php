<?php
class geonames {
	public static function get_location($lat, $long) {
		
		$url = 'http://maps.google.com/maps/api/geocode/xml?latlng='.$lat.','.$long;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$return = trim(curl_exec($ch));
		if(!empty($return)) {
			$object = simplexml_load_string($return);
			return (string) $object->result[0]->formatted_address;
		} else {
			return '';
		}
	}
}
?>