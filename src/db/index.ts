import { DataTypes } from 'sequelize';
import sequelize from './connections';
import init_models from './models';
import keys from './keys';
import pre_into from './contents';
import { DB } from 'interfaces';
//

// inits se buscan y creon o conecta con las tablas en la db
const model: any = init_models();

// crea la sllaves foraneas y primarias

// determina si la db se borrara completa y quedara limpia eliminar al subir a produccion
const force = true;
// se inicia la db
sequelize.sync({ force }).then((resp: any) => {
	if (resp) console.log('Init DB SUCCESS');
	else console.log('Init DB err');

	if (force) {
		keys(sequelize);
	}
});

export default model;
