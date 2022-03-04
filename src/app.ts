<<<<<<< HEAD
// app's
import services from './services';
import { createConnection, getRepository } from 'typeorm';
import fm_request from './db/models/fm_request';
import fm_dir_pos from './db/models/fm_dir_pos';

createConnection()
	.then(async () => {
		const sv = services.find((service: any): boolean => {
			const keySer: string = service.key;

			if (!process.env.npm_lifecycle_event) return false;
			const key = process.env.npm_lifecycle_event.replace(/(serve:|start:)/i, '');

			return keySer === key;
		});

		const { app, key } = sv;

		app.listen(app.get('port'), () => {
			console.log('____________________________________________________________________________');
			console.log('');
			console.log('██████╗  █████╗  ██████╗██╗  ██╗ ██████╗ ███████╗███████╗██╗ ██████╗███████╗');
			console.log('██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔═══██╗██╔════╝██╔════╝██║██╔════╝██╔════╝');
			console.log('██████╔╝███████║██║     █████╔╝ ██║   ██║█████╗  █████╗  ██║██║     █████╗  ');
			console.log('██╔══██╗██╔══██║██║     ██╔═██╗ ██║   ██║██╔══╝  ██╔══╝  ██║██║     ██╔══╝');
			console.log('██████╔╝██║  ██║╚██████╗██║  ██╗╚██████╔╝██║     ██║     ██║╚██████╗███████╗');
			console.log('╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝     ╚═╝ ╚═════╝╚══════╝ ');
			console.log(`Run "${key}" in Port:${app.get('port')}`);
			console.log('____________________________________________________________________________');
		});
	})
	.catch((err) => console.log('DB ERR', err));
/*
	ALTER TABLE "fm_client_photos_fm_photo" DROP CONSTRAINT "FK_9d63958d62d8e50a075685c7413";
	ALTER TABLE "fm_client_photos_fm_photo" DROP CONSTRAINT "FK_f6c435979c0cb0f36c0694741b4";
	ALTER TABLE "fm_client_id_roles_fm_roles" DROP CONSTRAINT "FK_5a9520d79b89237a7fbe8e5762e";
	ALTER TABLE "fm_client_id_roles_fm_roles" DROP CONSTRAINT "FK_867101050576ea82b6410de17ed";
	ALTER TABLE "fm_worker_roles_fm_roles" DROP CONSTRAINT "FK_309b6bc22137cc95e2efd3f16f0";
	ALTER TABLE "fm_worker_roles_fm_roles" DROP CONSTRAINT "FK_4bed12461b5ec1b54453861715e";
	ALTER TABLE "fm_roles_clients_fm_client" DROP CONSTRAINT "FK_ea2b0b86e2f06e1b0d251b5d51a";
	ALTER TABLE "fm_roles_clients_fm_client" DROP CONSTRAINT "FK_369e53e8a74897ea77081baf5e3";
	ALTER TABLE "fm_roles_workers_fm_worker" DROP CONSTRAINT "FK_f6a7ef607a6be2a971a0c4c8b5f";
	ALTER TABLE "fm_roles_workers_fm_worker" DROP CONSTRAINT "FK_eb99d93c3e30ae5516245708e2e";
	ALTER TABLE "fm_product_photos_fm_photo" DROP CONSTRAINT "FK_5c7a49c7769727f2a7161c16ee0";
	ALTER TABLE "fm_product_photos_fm_photo" DROP CONSTRAINT "FK_aead3451c666d14e82ccc3c48bc";
	ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_b3206a85c5fc305b43202938a17";
	ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_fda6f61fd547b39dd9a0f763a72";
	ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_ae4a2f524f6c29e5d38f265f7ac";
	ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_4933429781cd0ce9b4db32bd4ed";
	ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_e74342f2c030e08992c56df0af9";
	ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_9d10e9066e2a479adcf4830e65b";
	ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_363178079b89e15b47a66e5dbd0";
	ALTER TABLE "fm_activity" DROP CONSTRAINT "FK_7c7fad9604e8f103f82b763a11d";
	ALTER TABLE "fm_afiliados" DROP CONSTRAINT "FK_9d80d093a993a82cb4e7a1456ef";
	ALTER TABLE "fm_afiliados" DROP CONSTRAINT "FK_d82f3abdbeb01e63fce48ca1953";
	ALTER TABLE "fm_bank_commerce" DROP CONSTRAINT "FK_ac51278339d6ed7a4bcbb5bda7f";
	ALTER TABLE "fm_bank_commerce" DROP CONSTRAINT "FK_1f3e4561151d389d052b818d1ac";
	ALTER TABLE "fm_bank_commerce" DROP CONSTRAINT "FK_f6a998bb3ed4eb4c244b9baa7f3";
	ALTER TABLE "fm_client" DROP CONSTRAINT "FK_2429112946d86e74cfedf59fc6c";
	ALTER TABLE "fm_client" DROP CONSTRAINT "FK_d71b075dc26d880338a4140df10";
	ALTER TABLE "fm_client" DROP CONSTRAINT "FK_a4d752b12018c7ffc6a64a65307";
	ALTER TABLE "fm_phone" DROP CONSTRAINT "FK_3796c0f20cddbfce6840776200f";
	ALTER TABLE "fm_worker" DROP CONSTRAINT "FK_b7651b1e49eddd73c4d3a78c0a3";
	ALTER TABLE "fm_worker" DROP CONSTRAINT "FK_93ed0b26dab2997d685e1ea0e56";
	ALTER TABLE "fm_worker" DROP CONSTRAINT "FK_e018746d22c55fc0477298963ad";
	ALTER TABLE "fm_aci_commerce" DROP CONSTRAINT "FK_fe4db5ac79802a647e0c50e7487";
	ALTER TABLE "fm_aci_commerce" DROP CONSTRAINT "FK_30c2d9c55728a95e712e8373627";
	ALTER TABLE "fm_company" DROP CONSTRAINT "FK_dbee0c02784ebe3f0c0330014b4";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_4f207c9a0e9645910383377f86d";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_c4efb1cf02f43090740926bb1fc";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_82416fb6e19b7157d05f08584fe";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_f2cb8353f19c168725999701d7d";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_8e6a76c31cf8fb8ef74f4823e10";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_88cdbf21a125980f977d82c27b1";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_96c58e4419abc60056da31ef769";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_bd495da93173bc09fe6d62b98b5";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_e58a708881405ef2655aef9fd81";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_7af3f0d3b144b7d6a72ceac4073";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_680b2a0d78e2edb2fd85052e89a";
	ALTER TABLE "fm_quotas_calculated" DROP CONSTRAINT "FK_47c08889ebe40f2671a747e6149";
	ALTER TABLE "fm_quotas_calculated" DROP CONSTRAINT "FK_0673175b200532308fc36fd3185";
	ALTER TABLE "fm_payment_book" DROP CONSTRAINT "FK_a6616065a97d1234c8cebb2842b";
	ALTER TABLE "fm_status" DROP CONSTRAINT "FK_c8e50e7831f97bb4247b9edd91a";
	ALTER TABLE "fm_status" DROP CONSTRAINT "FK_65c1dc9c7cb36fda1f2cbf41d71";
	ALTER TABLE "fm_status" DROP CONSTRAINT "FK_fba8ef1cff94c2c7b202d6deb0d";
	ALTER TABLE "fm_dir_pos" DROP CONSTRAINT "FK_f4754d81e43ea2411cf4a519bc0";
	ALTER TABLE "fm_dir_pos" DROP CONSTRAINT "FK_9af2a5b750e303f6a4e5870a443";
	ALTER TABLE "fm_dir_pos" DROP CONSTRAINT "FK_7ef2c34882b3fb18bc366679aa6";
	ALTER TABLE "fm_dir_pos" DROP CONSTRAINT "FK_7a14b7e77f8a819735106b016e5";
	ALTER TABLE "fm_location" DROP CONSTRAINT "FK_73174abf588e8edc848e2e3a121";
	ALTER TABLE "fm_location" DROP CONSTRAINT "FK_3e940da713ea86a9367f70618d0";
	ALTER TABLE "fm_location" DROP CONSTRAINT "FK_1c57c6523dd537b0ef0a9f5b419";
	ALTER TABLE "fm_location" DROP CONSTRAINT "FK_61ea978348ae6a36894bd39de24";
	ALTER TABLE "fm_municipio" DROP CONSTRAINT "FK_9210306e682154252390bb45859";
	ALTER TABLE "fm_parroquia" DROP CONSTRAINT "FK_4ac1c804b1f8dcfc3b08363151f";
	ALTER TABLE "fm_ciudad" DROP CONSTRAINT "FK_41e29c427582948e763288142c1";
	ALTER TABLE "fm_photo" DROP CONSTRAINT "FK_f2bbbe05ebffdcb768131a549ce";
	ALTER TABLE "fm_commerce_constitutive_act" DROP CONSTRAINT "FK_44c80483329d8b67210918e9aa3";
	ALTER TABLE "fm_commerce_constitutive_act" DROP CONSTRAINT "FK_6331f365268dbf2df9ff0f9991e";
	DROP INDEX "IDX_9d63958d62d8e50a075685c741" ON "fm_client_photos_fm_photo";
	DROP INDEX "IDX_f6c435979c0cb0f36c0694741b" ON "fm_client_photos_fm_photo";
	DROP TABLE "fm_client_photos_fm_photo";
	DROP INDEX "IDX_5a9520d79b89237a7fbe8e5762" ON "fm_client_id_roles_fm_roles";
	DROP INDEX "IDX_867101050576ea82b6410de17e" ON "fm_client_id_roles_fm_roles";
	DROP TABLE "fm_client_id_roles_fm_roles";
	DROP INDEX "IDX_309b6bc22137cc95e2efd3f16f" ON "fm_worker_roles_fm_roles";
	DROP INDEX "IDX_4bed12461b5ec1b54453861715" ON "fm_worker_roles_fm_roles";
	DROP TABLE "fm_worker_roles_fm_roles";
	DROP INDEX "IDX_ea2b0b86e2f06e1b0d251b5d51" ON "fm_roles_clients_fm_client";
	DROP INDEX "IDX_369e53e8a74897ea77081baf5e" ON "fm_roles_clients_fm_client";
	DROP TABLE "fm_roles_clients_fm_client";
	DROP INDEX "IDX_f6a7ef607a6be2a971a0c4c8b5" ON "fm_roles_workers_fm_worker";
	DROP INDEX "IDX_eb99d93c3e30ae5516245708e2" ON "fm_roles_workers_fm_worker";
	DROP TABLE "fm_roles_workers_fm_worker";
	DROP INDEX "IDX_5c7a49c7769727f2a7161c16ee" ON "fm_product_photos_fm_photo";
	DROP INDEX "IDX_aead3451c666d14e82ccc3c48b" ON "fm_product_photos_fm_photo";
	DROP TABLE "fm_product_photos_fm_photo";
	DROP TABLE "fm_commerce";
	DROP TABLE "fm_activity";
	DROP TABLE "fm_afiliados";
	DROP TABLE "fm_type_person";
	DROP TABLE "fm_bank";
	DROP TABLE "fm_bank_commerce";
	DROP INDEX "IDX_15f756dc2a9a6aefe1751f731f" ON "fm_client";
	DROP TABLE "fm_client";
	DROP TABLE "fm_phone";
	DROP TABLE "fm_ident_type";
	DROP INDEX "IDX_7a21b1b04b3df8909ad71d8909" ON "fm_worker";
	DROP TABLE "fm_worker";
	DROP INDEX "REL_30c2d9c55728a95e712e837362" ON "fm_aci_commerce";
	DROP TABLE "fm_aci_commerce";
	DROP TABLE "fm_company";
	DROP TABLE "fm_roles";
	DROP INDEX "REL_82416fb6e19b7157d05f08584f" ON "fm_request";
	DROP INDEX "REL_680b2a0d78e2edb2fd85052e89" ON "fm_request";
	DROP TABLE "fm_request";
	DROP TABLE "fm_valid_request";
	DROP TABLE "fm_type_payment";
	DROP INDEX "REL_47c08889ebe40f2671a747e614" ON "fm_quotas_calculated";
	DROP TABLE "fm_quotas_calculated";
	DROP TABLE "fm_payment_book";
	DROP TABLE "fm_status";
	DROP TABLE "fm_department";
	DROP TABLE "fm_status_request";
	DROP TABLE "fm_request_origin";
	DROP TABLE "fm_payment_method";
	DROP INDEX "REL_9af2a5b750e303f6a4e5870a44" ON "fm_dir_pos";
	DROP TABLE "fm_dir_pos";
	DROP TABLE "fm_product";
	DROP TABLE "fm_location";
	DROP TABLE "fm_estado";
	DROP TABLE "fm_municipio";
	DROP TABLE "fm_parroquia";
	DROP TABLE "fm_ciudad";
	DROP INDEX "REL_f2bbbe05ebffdcb768131a549c" ON "fm_photo";
	DROP TABLE "fm_photo";
	DROP TABLE "fm_commerce_constitutive_act";
	DROP TABLE "fm_type_request";
*/
=======
// app's
import services from './services';
import { createConnection, getRepository } from 'typeorm';
import fm_request from './db/models/fm_request';
import fm_dir_pos from './db/models/fm_dir_pos';

createConnection()
	.then(async () => {
		const sv = services.find((service: any): boolean => {
			const keySer: string = service.key;

			if (!process.env.npm_lifecycle_event) return false;
			const key = process.env.npm_lifecycle_event.replace(/(serve:|start:)/i, '');

			return keySer === key;
		});

		const { app, key } = sv;

		app.listen(app.get('port'), () => {
			console.log('____________________________________________________________________________');
			console.log('');
			console.log('██████╗  █████╗  ██████╗██╗  ██╗ ██████╗ ███████╗███████╗██╗ ██████╗███████╗');
			console.log('██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔═══██╗██╔════╝██╔════╝██║██╔════╝██╔════╝');
			console.log('██████╔╝███████║██║     █████╔╝ ██║   ██║█████╗  █████╗  ██║██║     █████╗  ');
			console.log('██╔══██╗██╔══██║██║     ██╔═██╗ ██║   ██║██╔══╝  ██╔══╝  ██║██║     ██╔══╝');
			console.log('██████╔╝██║  ██║╚██████╗██║  ██╗╚██████╔╝██║     ██║     ██║╚██████╗███████╗');
			console.log('╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝     ╚═╝ ╚═════╝╚══════╝ ');
			console.log(`Run "${key}" in Port:${app.get('port')}`);
			console.log('____________________________________________________________________________');
		});
	})
	.catch((err) => console.log('DB ERR', err));
/*
	ALTER TABLE "fm_client_photos_fm_photo" DROP CONSTRAINT "FK_9d63958d62d8e50a075685c7413";
	ALTER TABLE "fm_client_photos_fm_photo" DROP CONSTRAINT "FK_f6c435979c0cb0f36c0694741b4";
	ALTER TABLE "fm_client_id_roles_fm_roles" DROP CONSTRAINT "FK_5a9520d79b89237a7fbe8e5762e";
	ALTER TABLE "fm_client_id_roles_fm_roles" DROP CONSTRAINT "FK_867101050576ea82b6410de17ed";
	ALTER TABLE "fm_worker_roles_fm_roles" DROP CONSTRAINT "FK_309b6bc22137cc95e2efd3f16f0";
	ALTER TABLE "fm_worker_roles_fm_roles" DROP CONSTRAINT "FK_4bed12461b5ec1b54453861715e";
	ALTER TABLE "fm_roles_clients_fm_client" DROP CONSTRAINT "FK_ea2b0b86e2f06e1b0d251b5d51a";
	ALTER TABLE "fm_roles_clients_fm_client" DROP CONSTRAINT "FK_369e53e8a74897ea77081baf5e3";
	ALTER TABLE "fm_roles_workers_fm_worker" DROP CONSTRAINT "FK_f6a7ef607a6be2a971a0c4c8b5f";
	ALTER TABLE "fm_roles_workers_fm_worker" DROP CONSTRAINT "FK_eb99d93c3e30ae5516245708e2e";
	ALTER TABLE "fm_product_photos_fm_photo" DROP CONSTRAINT "FK_5c7a49c7769727f2a7161c16ee0";
	ALTER TABLE "fm_product_photos_fm_photo" DROP CONSTRAINT "FK_aead3451c666d14e82ccc3c48bc";
	ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_b3206a85c5fc305b43202938a17";
	ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_fda6f61fd547b39dd9a0f763a72";
	ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_ae4a2f524f6c29e5d38f265f7ac";
	ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_4933429781cd0ce9b4db32bd4ed";
	ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_e74342f2c030e08992c56df0af9";
	ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_9d10e9066e2a479adcf4830e65b";
	ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_363178079b89e15b47a66e5dbd0";
	ALTER TABLE "fm_activity" DROP CONSTRAINT "FK_7c7fad9604e8f103f82b763a11d";
	ALTER TABLE "fm_afiliados" DROP CONSTRAINT "FK_9d80d093a993a82cb4e7a1456ef";
	ALTER TABLE "fm_afiliados" DROP CONSTRAINT "FK_d82f3abdbeb01e63fce48ca1953";
	ALTER TABLE "fm_bank_commerce" DROP CONSTRAINT "FK_ac51278339d6ed7a4bcbb5bda7f";
	ALTER TABLE "fm_bank_commerce" DROP CONSTRAINT "FK_1f3e4561151d389d052b818d1ac";
	ALTER TABLE "fm_bank_commerce" DROP CONSTRAINT "FK_f6a998bb3ed4eb4c244b9baa7f3";
	ALTER TABLE "fm_client" DROP CONSTRAINT "FK_2429112946d86e74cfedf59fc6c";
	ALTER TABLE "fm_client" DROP CONSTRAINT "FK_d71b075dc26d880338a4140df10";
	ALTER TABLE "fm_client" DROP CONSTRAINT "FK_a4d752b12018c7ffc6a64a65307";
	ALTER TABLE "fm_phone" DROP CONSTRAINT "FK_3796c0f20cddbfce6840776200f";
	ALTER TABLE "fm_worker" DROP CONSTRAINT "FK_b7651b1e49eddd73c4d3a78c0a3";
	ALTER TABLE "fm_worker" DROP CONSTRAINT "FK_93ed0b26dab2997d685e1ea0e56";
	ALTER TABLE "fm_worker" DROP CONSTRAINT "FK_e018746d22c55fc0477298963ad";
	ALTER TABLE "fm_aci_commerce" DROP CONSTRAINT "FK_fe4db5ac79802a647e0c50e7487";
	ALTER TABLE "fm_aci_commerce" DROP CONSTRAINT "FK_30c2d9c55728a95e712e8373627";
	ALTER TABLE "fm_company" DROP CONSTRAINT "FK_dbee0c02784ebe3f0c0330014b4";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_4f207c9a0e9645910383377f86d";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_c4efb1cf02f43090740926bb1fc";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_82416fb6e19b7157d05f08584fe";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_f2cb8353f19c168725999701d7d";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_8e6a76c31cf8fb8ef74f4823e10";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_88cdbf21a125980f977d82c27b1";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_96c58e4419abc60056da31ef769";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_bd495da93173bc09fe6d62b98b5";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_e58a708881405ef2655aef9fd81";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_7af3f0d3b144b7d6a72ceac4073";
	ALTER TABLE "fm_request" DROP CONSTRAINT "FK_680b2a0d78e2edb2fd85052e89a";
	ALTER TABLE "fm_quotas_calculated" DROP CONSTRAINT "FK_47c08889ebe40f2671a747e6149";
	ALTER TABLE "fm_quotas_calculated" DROP CONSTRAINT "FK_0673175b200532308fc36fd3185";
	ALTER TABLE "fm_payment_book" DROP CONSTRAINT "FK_a6616065a97d1234c8cebb2842b";
	ALTER TABLE "fm_status" DROP CONSTRAINT "FK_c8e50e7831f97bb4247b9edd91a";
	ALTER TABLE "fm_status" DROP CONSTRAINT "FK_65c1dc9c7cb36fda1f2cbf41d71";
	ALTER TABLE "fm_status" DROP CONSTRAINT "FK_fba8ef1cff94c2c7b202d6deb0d";
	ALTER TABLE "fm_dir_pos" DROP CONSTRAINT "FK_f4754d81e43ea2411cf4a519bc0";
	ALTER TABLE "fm_dir_pos" DROP CONSTRAINT "FK_9af2a5b750e303f6a4e5870a443";
	ALTER TABLE "fm_dir_pos" DROP CONSTRAINT "FK_7ef2c34882b3fb18bc366679aa6";
	ALTER TABLE "fm_dir_pos" DROP CONSTRAINT "FK_7a14b7e77f8a819735106b016e5";
	ALTER TABLE "fm_location" DROP CONSTRAINT "FK_73174abf588e8edc848e2e3a121";
	ALTER TABLE "fm_location" DROP CONSTRAINT "FK_3e940da713ea86a9367f70618d0";
	ALTER TABLE "fm_location" DROP CONSTRAINT "FK_1c57c6523dd537b0ef0a9f5b419";
	ALTER TABLE "fm_location" DROP CONSTRAINT "FK_61ea978348ae6a36894bd39de24";
	ALTER TABLE "fm_municipio" DROP CONSTRAINT "FK_9210306e682154252390bb45859";
	ALTER TABLE "fm_parroquia" DROP CONSTRAINT "FK_4ac1c804b1f8dcfc3b08363151f";
	ALTER TABLE "fm_ciudad" DROP CONSTRAINT "FK_41e29c427582948e763288142c1";
	ALTER TABLE "fm_photo" DROP CONSTRAINT "FK_f2bbbe05ebffdcb768131a549ce";
	ALTER TABLE "fm_commerce_constitutive_act" DROP CONSTRAINT "FK_44c80483329d8b67210918e9aa3";
	ALTER TABLE "fm_commerce_constitutive_act" DROP CONSTRAINT "FK_6331f365268dbf2df9ff0f9991e";
	DROP INDEX "IDX_9d63958d62d8e50a075685c741" ON "fm_client_photos_fm_photo";
	DROP INDEX "IDX_f6c435979c0cb0f36c0694741b" ON "fm_client_photos_fm_photo";
	DROP TABLE "fm_client_photos_fm_photo";
	DROP INDEX "IDX_5a9520d79b89237a7fbe8e5762" ON "fm_client_id_roles_fm_roles";
	DROP INDEX "IDX_867101050576ea82b6410de17e" ON "fm_client_id_roles_fm_roles";
	DROP TABLE "fm_client_id_roles_fm_roles";
	DROP INDEX "IDX_309b6bc22137cc95e2efd3f16f" ON "fm_worker_roles_fm_roles";
	DROP INDEX "IDX_4bed12461b5ec1b54453861715" ON "fm_worker_roles_fm_roles";
	DROP TABLE "fm_worker_roles_fm_roles";
	DROP INDEX "IDX_ea2b0b86e2f06e1b0d251b5d51" ON "fm_roles_clients_fm_client";
	DROP INDEX "IDX_369e53e8a74897ea77081baf5e" ON "fm_roles_clients_fm_client";
	DROP TABLE "fm_roles_clients_fm_client";
	DROP INDEX "IDX_f6a7ef607a6be2a971a0c4c8b5" ON "fm_roles_workers_fm_worker";
	DROP INDEX "IDX_eb99d93c3e30ae5516245708e2" ON "fm_roles_workers_fm_worker";
	DROP TABLE "fm_roles_workers_fm_worker";
	DROP INDEX "IDX_5c7a49c7769727f2a7161c16ee" ON "fm_product_photos_fm_photo";
	DROP INDEX "IDX_aead3451c666d14e82ccc3c48b" ON "fm_product_photos_fm_photo";
	DROP TABLE "fm_product_photos_fm_photo";
	DROP TABLE "fm_commerce";
	DROP TABLE "fm_activity";
	DROP TABLE "fm_afiliados";
	DROP TABLE "fm_type_person";
	DROP TABLE "fm_bank";
	DROP TABLE "fm_bank_commerce";
	DROP INDEX "IDX_15f756dc2a9a6aefe1751f731f" ON "fm_client";
	DROP TABLE "fm_client";
	DROP TABLE "fm_phone";
	DROP TABLE "fm_ident_type";
	DROP INDEX "IDX_7a21b1b04b3df8909ad71d8909" ON "fm_worker";
	DROP TABLE "fm_worker";
	DROP INDEX "REL_30c2d9c55728a95e712e837362" ON "fm_aci_commerce";
	DROP TABLE "fm_aci_commerce";
	DROP TABLE "fm_company";
	DROP TABLE "fm_roles";
	DROP INDEX "REL_82416fb6e19b7157d05f08584f" ON "fm_request";
	DROP INDEX "REL_680b2a0d78e2edb2fd85052e89" ON "fm_request";
	DROP TABLE "fm_request";
	DROP TABLE "fm_valid_request";
	DROP TABLE "fm_type_payment";
	DROP INDEX "REL_47c08889ebe40f2671a747e614" ON "fm_quotas_calculated";
	DROP TABLE "fm_quotas_calculated";
	DROP TABLE "fm_payment_book";
	DROP TABLE "fm_status";
	DROP TABLE "fm_department";
	DROP TABLE "fm_status_request";
	DROP TABLE "fm_request_origin";
	DROP TABLE "fm_payment_method";
	DROP INDEX "REL_9af2a5b750e303f6a4e5870a44" ON "fm_dir_pos";
	DROP TABLE "fm_dir_pos";
	DROP TABLE "fm_product";
	DROP TABLE "fm_location";
	DROP TABLE "fm_estado";
	DROP TABLE "fm_municipio";
	DROP TABLE "fm_parroquia";
	DROP TABLE "fm_ciudad";
	DROP INDEX "REL_f2bbbe05ebffdcb768131a549c" ON "fm_photo";
	DROP TABLE "fm_photo";
	DROP TABLE "fm_commerce_constitutive_act";
	DROP TABLE "fm_type_request";
*/
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
