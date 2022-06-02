import fm_department from '../../../../../db/models/fm_department';
import fm_roles from '../../../../../db/models/fm_roles';

export const getPermiss = (value: any[]) => {
	let list: { [key: string]: number } = {};
	for (const key of value) {
		if (key.active) {
			let item: string = key.id_action.name;
			//console.log(item);
			list[item] = key.id_action.id;
		}
	}
	return list;
};

export const getViews = (access_views: any[]) => {
	let listViews: { [key: string]: number } = {};
	for (const key of access_views) {
		if (key.active) {
			let item: string = key.id_views.name;
			//console.log(item);
			listViews[item] = key.id_views.id;
		}
	}
	return listViews;
};

export interface DataUser {
	data: any;
	/*
	{
		id_department: fm_department;
		id_roles: fm_roles;
	};
	*/
	views: any[];
	permiss: any[];
}

export const dataWorker = (
	worker: any,
	id_department: fm_department,
	id_rol: fm_roles,
	permiss: any,
	views: any
) => ({
	data: {
		...worker,
		id_department,
		id_rol,
	},
	views,
	permiss,
});
