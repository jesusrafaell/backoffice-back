import Sql from '../connections';
import { DataTypes, Model } from 'sequelize';
import { DB } from 'interfaces';

export default (config: any) => {
	const { STRING, INTEGER } = DataTypes;

	const User = Sql.define<DB.UserInit>(
		'fm_user',
		{
			id: { type: INTEGER({ length: 11 }), primaryKey: true, autoIncrement: true },
			name: { type: STRING({ length: 128 }) },
			last_name: { type: STRING({ length: 128 }) },
			id_roles: { type: INTEGER({ length: 11 }) },
			password: { type: STRING() },
			id_ident_type: { type: INTEGER({ length: 11 }) },
			nro_ident: { type: STRING({ length: 11 }) },
			id_depart: { type: INTEGER({ length: 11 }) },
			email: { type: STRING({ length: 128 }) },
		},
		config
	);

	return User;
};
