export const relationsFMFull = [
	'status',
	'status.id_department',
	'status.id_status_request',
	//
	'id_client',
	'id_client.id_location',
	'id_client.id_location.id_direccion',
	'id_client.rc_ident_card',
	'id_client.id_ident_type',
	'id_client.phones',
	//
	'id_commerce',
	'id_commerce.id_ident_type',
	'id_commerce.id_activity',
	'id_commerce.id_location',
	'id_commerce.id_location.id_direccion',
	'id_commerce.banks',
	'id_commerce.rc_constitutive_act',
	'id_commerce.rc_constitutive_act.id_photo',
	'id_commerce.rc_rif',
	'id_commerce.rc_special_contributor',
	'id_commerce.id_aci',
	//
	'rc_planilla',
	'rc_planilla.id_photo',
	'id_valid_request',
	//
	'pos',
	'pos.id_product',
	'pos.id_location',
	'pos.id_location.id_direccion',
	//
	'id_type_request',
	'id_request_origin',
	//
	'rc_ref_bank',
	'rc_comp_dep',
	'id_payment_method',
	'id_type_payment',
];
