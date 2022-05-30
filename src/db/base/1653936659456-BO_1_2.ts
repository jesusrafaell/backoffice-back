import { MigrationInterface, QueryRunner } from 'typeorm';

export class BO121653936659456 implements MigrationInterface {
	name = 'BO121653936659456';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "fm_type_request" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_997f9cd296f703cf8a30433561f" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_ead8c3227a188cc1ed07635d03d" DEFAULT getdate(), CONSTRAINT "PK_d7b52c340b7fa1d9ad9836bec84" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_commerce_constitutive_act" ("id" int NOT NULL IDENTITY(1,1), "id_commerce" int, "id_photo" int, CONSTRAINT "PK_11e5e695fdd0292eede6e634ee1" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_planilla" ("id" int NOT NULL IDENTITY(1,1), "id_request" int, "id_photo" int, CONSTRAINT "PK_17aa7fe81ddc443551b7f4235bb" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_status_photo" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_965deb833f26ee33f6aaa74ed14" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_1acb9e2996f0bbfa1ed97c56239" DEFAULT getdate(), CONSTRAINT "PK_4888846ecb00b37ef38eea91342" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_photo" ("id" int NOT NULL IDENTITY(1,1), "path" nvarchar(255), "name" nvarchar(255), "id_status" int NOT NULL CONSTRAINT "DF_541d2a307418c4c8d256b8c3371" DEFAULT 1, "descript" nvarchar(255), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_9a7472173012449a35734d65ade" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_a6161f830919c74a58d3c4813eb" DEFAULT getdate(), "rcConstitutiveActId" int, "rcPlanillaId" int, CONSTRAINT "PK_7bb4d32f98922c8d468355ed1c8" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "REL_f2bbbe05ebffdcb768131a549c" ON "fm_photo" ("rcConstitutiveActId") WHERE "rcConstitutiveActId" IS NOT NULL`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "REL_b183d41df081e7522d1a1b770d" ON "fm_photo" ("rcPlanillaId") WHERE "rcPlanillaId" IS NOT NULL`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_payment_method" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_bbe33904cbd49bf2ba040d5bbbe" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_ed257de8d6fdc6ede2f67e55ba3" DEFAULT getdate(), CONSTRAINT "PK_0bfd5127d1db6985eec810b3bf5" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_location" ("id" int NOT NULL IDENTITY(1,1), "calle" nvarchar(255), "local" nvarchar(255), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_606e17763afea82bcc8c6842275" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_8f15e5e70d357faad50dafcecd6" DEFAULT getdate(), "id_direccion" int, CONSTRAINT "PK_0192539649646c28258e50dfd76" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_pos_xcommerce" ("id" int NOT NULL IDENTITY(1,1), "aboTerminal" nvarchar(255), "serial" nvarchar(255), "active" int NOT NULL CONSTRAINT "DF_880756ff1d0fbe1ddf67ba58947" DEFAULT 1, "id_cartera" int, "id_cartera_ter" int, "id_location" int, "id_commerce" int, "id_request" int, "id_product" int, CONSTRAINT "PK_9312e1c3e356b5203edd445d376" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_product" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "description" nvarchar(255), "price" int, "quota" int NOT NULL CONSTRAINT "DF_08fb1b0c802fc5a6038a7abf4a1" DEFAULT 50, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_1ccb549470e9fee1573b1ea5972" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_defb269b26f4e3ef9cc32b14bc3" DEFAULT getdate(), CONSTRAINT "PK_74b9b940f9653db01b7117cffac" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_request_origin" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), CONSTRAINT "PK_46628188d2a3ec54075667a9d53" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_status_request" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_3e0f814325cfb5d4656eced64f2" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_2aca385c7abd727365e86629264" DEFAULT getdate(), CONSTRAINT "PK_f3dddb343c7adbc615c4cf28df6" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_actions" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "active" int NOT NULL CONSTRAINT "DF_a928b5931254e28f6562da07c3d" DEFAULT 1, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_e842986b9b976b81c515b96a109" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_f981511c2e6e3e8269a2c141321" DEFAULT getdate(), "id_department" int, CONSTRAINT "PK_c5d98f586f2f12fd15ace41e7b4" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_roles" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "active" int NOT NULL CONSTRAINT "DF_409bbefbb28ee5ae3958546542c" DEFAULT 1, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_14894554fc7a0216fe7d3bac62c" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_aad4135a4b113abe218828517a0" DEFAULT getdate(), CONSTRAINT "PK_b0f909dbec9a1d1a8a9b8e10ede" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_permissions" ("id" int NOT NULL IDENTITY(1,1), "active" int NOT NULL CONSTRAINT "DF_e2feba4cee07276af9673810d0f" DEFAULT 1, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_ce5753d361d44678147e921fdc1" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_851edf4d0d05b95acce6e771cd7" DEFAULT getdate(), "id_department" int, "id_rol" int, "id_action" int, CONSTRAINT "PK_a438484999e4fcf874fde36e643" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_c9ff6a42bad0b6e7fc55202e8d" ON "fm_permissions" ("id_department", "id_rol", "id_action") `
		);
		await queryRunner.query(
			`CREATE TABLE "fm_views" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "active" int NOT NULL CONSTRAINT "DF_dbf110714967f053b99d9bfe903" DEFAULT 1, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_d7403039bb243a5732afe479e95" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_d2d7eacbdf77e9fe78a113496da" DEFAULT getdate(), CONSTRAINT "PK_4f5621f4ce612f80af003e289ac" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_access_views" ("id" int NOT NULL IDENTITY(1,1), "active" int NOT NULL CONSTRAINT "DF_063b624eb8d3bef10860c9b8c80" DEFAULT 1, "id_department" int, "id_views" int, CONSTRAINT "PK_070f497e635a0c33a95baa92168" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_e5d03665f00b7b38f94a9c7f67" ON "fm_access_views" ("id_department", "id_views") `
		);
		await queryRunner.query(
			`CREATE TABLE "fm_department" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "active" int NOT NULL CONSTRAINT "DF_62900449f67ecc80acadd1106a2" DEFAULT 1, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_88e4e6cd33457fb1d2786f6a632" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_889fc26b13d39fe4ea250bbfa4c" DEFAULT getdate(), CONSTRAINT "PK_eadfe195782d7e0aebd062cccb9" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_status" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_791328ce8e2c24140502a67e8fd" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_499beead1dc8e7b87a5f9445612" DEFAULT getdate(), "id_request" int, "id_department" int, "id_status_request" int, CONSTRAINT "PK_91eb9ad0df74b9d29b53a527599" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_payment_book" ("id" int NOT NULL IDENTITY(1,1), "relative_date" datetime NOT NULL, "absolute_date" datetime NOT NULL, "id_quotas_calculated" int, CONSTRAINT "PK_e68835ad49da9303241569c559c" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_quotas_calculated" ("id" int NOT NULL IDENTITY(1,1), "id_request" int, "initial" int, "quotas_total" int NOT NULL, "quotas_to_pay" int NOT NULL, "quotas_paid" int NOT NULL CONSTRAINT "DF_72907038703bed0e840986e1c09" DEFAULT 0, "id_type_payment" int, CONSTRAINT "PK_1fcb0d27b4a1b6212c8c20d6141" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "REL_47c08889ebe40f2671a747e614" ON "fm_quotas_calculated" ("id_request") WHERE "id_request" IS NOT NULL`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_type_payment" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), CONSTRAINT "PK_a3cfe925bfabad7b00a14912e3c" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_type_diferido" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_36aaed168d46c9bb97b78623ad4" DEFAULT getdate(), CONSTRAINT "PK_5488658074ee045452e15f5e843" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_valid_request" ("id" int NOT NULL IDENTITY(1,1), "id_typedif_client" int, "id_typedif_commerce" int, "id_typedif_pos" int, "id_typedif_ref_bank" int, "id_typedif_comp_num" int, "id_typedif_consitutive_acta" int, "id_typedif_planilla" int, "id_typedif_special_contributor" int, "valid_ident_card" nvarchar(255) NOT NULL, "valid_rif" nvarchar(255) NOT NULL, "valid_constitutive_act" nvarchar(255) NOT NULL, "valid_special_contributor" nvarchar(255) NOT NULL, "valid_ref_bank" nvarchar(255) NOT NULL, "valid_planilla" nvarchar(255) NOT NULL, "valid_comp_dep" nvarchar(255) NOT NULL, "valid_pos" nvarchar(255) NOT NULL, CONSTRAINT "PK_30eecfe0092a93cd8d345586e76" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_request" ("id" int NOT NULL IDENTITY(1,1), "code" nvarchar(255), "number_post" int, "bank_account_num" nvarchar(255), "ci_referred" nvarchar(255), "nro_comp_dep" nvarchar(255), "discount" bit, "pagadero" bit, "id_quotas_calculat" int, "id_payment_method" int, "id_type_payment" int, "id_client" int, "id_commerce" int, "id_product" int, "id_type_request" int, "id_request_origin" int, "id_valid_request" int, "rc_comp_dep" int, "rc_ref_bank" int, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_1284c74e7454ad173773d68d2d3" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_25390c098a36ce62d28e42bd768" DEFAULT getdate(), CONSTRAINT "PK_bdbd90f697fa3fc67ed2207f66c" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "REL_680b2a0d78e2edb2fd85052e89" ON "fm_request" ("id_quotas_calculat") WHERE "id_quotas_calculat" IS NOT NULL`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "REL_82416fb6e19b7157d05f08584f" ON "fm_request" ("id_valid_request") WHERE "id_valid_request" IS NOT NULL`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_company" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_91476e2adc6b8588bc94fecab2e" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_2c4492fe892c73fcd2dcac60c5f" DEFAULT getdate(), "id_commerce" int, CONSTRAINT "PK_fdfa792f651a4844d89c9f9b8ab" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_aci_commerce" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_3295e30bfff0befa68b01840924" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_f0cd0ab16bdf15f24b21e22a4d9" DEFAULT getdate(), "id_commerce" int, "id_worker" int, CONSTRAINT "PK_bf1f8c839373d4e9a45daff974a" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "REL_30c2d9c55728a95e712e837362" ON "fm_aci_commerce" ("id_commerce") WHERE "id_commerce" IS NOT NULL`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_worker" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "last_name" nvarchar(255), "password" nvarchar(255), "id_department" int NOT NULL CONSTRAINT "DF_b7651b1e49eddd73c4d3a78c0a3" DEFAULT 1, "id_rol" int NOT NULL CONSTRAINT "DF_17c07e619578d8c470dfe97e015" DEFAULT 1, "ident_num" nvarchar(255), "email" nvarchar(255) NOT NULL, "block" int NOT NULL CONSTRAINT "DF_fb255af61f5baf90d546e06ad15" DEFAULT 0, "phone" nvarchar(255), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_870b59f9b2469b79bb4edd5733f" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_81d2a39c5134e21c4f300c60925" DEFAULT getdate(), "id_ident_type" int, "id_company" int, CONSTRAINT "UQ_35eb1f25e7bf89140a2c986b07e" UNIQUE ("email"), CONSTRAINT "PK_bfdfa405d4a55894c0f9f30be3e" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_7a21b1b04b3df8909ad71d8909" ON "fm_worker" ("id_ident_type", "ident_num") `
		);
		await queryRunner.query(
			`CREATE TABLE "fm_ident_type" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_7e2dc1f48265fd4426912f8000d" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_14373de418416ad7bb9f8311784" DEFAULT getdate(), CONSTRAINT "PK_fd14a58b675357f23b15e168ae6" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_phone" ("id" int NOT NULL IDENTITY(1,1), "phone" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_94056d5651696d22a31a4aa6711" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_33339efd6ff91e08418534fc401" DEFAULT getdate(), "id_client" int, CONSTRAINT "PK_daa6754aa4e550e51a993683557" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_client" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "last_name" nvarchar(255), "password" nvarchar(255) NOT NULL, "id_ident_type" int, "ident_num" nvarchar(255), "email" nvarchar(255) NOT NULL, "validate" int NOT NULL CONSTRAINT "DF_4824a2ce30715f978c64ae274ec" DEFAULT 0, "rc_ident_card" int, "ref_person_1" nvarchar(255) NOT NULL, "ref_person_2" nvarchar(255) NOT NULL, "id_location" int, CONSTRAINT "UQ_2b426d3e17a73aa07179aeb223d" UNIQUE ("email"), CONSTRAINT "PK_36e96bfb34ce29232f54023c5b7" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_15f756dc2a9a6aefe1751f731f" ON "fm_client" ("id_ident_type", "ident_num") `
		);
		await queryRunner.query(
			`CREATE TABLE "fm_bank_commerce" ("id" int NOT NULL IDENTITY(1,1), "bank_account_num" nvarchar(255), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_fd61ce35c4d90076d7d0e6c519c" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_d650ce858cabf47ec060d6dc110" DEFAULT getdate(), "id_commerce" int, "id_client" int, "id_bank" int, CONSTRAINT "PK_f66d33a4c718ef7085f5ab86843" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_bank" ("id" int NOT NULL IDENTITY(1,1), "code" nvarchar(255), "name" nvarchar(255), "alias" nvarchar(255), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_edfee9c4a132e504fbe2d51efbd" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_ced54593549010a9782a6fe7eca" DEFAULT getdate(), CONSTRAINT "PK_2d7545b5741867abd3626fdd215" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_type_person" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), CONSTRAINT "PK_aa6fdbd793e67ed3ab89aa1a002" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_afiliados" ("id" int NOT NULL IDENTITY(1,1), "bank_account_number" nvarchar(255), "name" nvarchar(255), "id_type_person" int, "id_bank" int, CONSTRAINT "PK_55acf88ee90f3000ae4f6548978" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_activity" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_f0f2d182af4656a5ab349056461" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_7f721b3c3629fdf2e8b4c43157f" DEFAULT getdate(), "id_afiliado" int, CONSTRAINT "PK_0388a73e1372de300962e6be970" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_redes_tms7" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "net_id" int NOT NULL, "parametrization" nvarchar(255) NOT NULL, "version" int NOT NULL, "active" int NOT NULL CONSTRAINT "DF_2e28332f05b25b06b32dff880c7" DEFAULT 1, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_b34da4d8a60a3c94c7aa2689b04" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_3adababdf7f22d0084b37697fce" DEFAULT getdate(), CONSTRAINT "PK_fd829e9d856c86c5c7bc768ff09" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_wallet_bank" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "id_cartera" int NOT NULL, "active" int NOT NULL CONSTRAINT "DF_607931957cbf400595d3aa0f662" DEFAULT 1, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_c6b1ded20fc0dcc5bb462d0f93b" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_1ec09889abb8beb5f69e1406f17" DEFAULT getdate(), "id_redes_tms7" int, CONSTRAINT "PK_fe648edab3d29c7261cace62836" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_wallet_commerce" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_ea9329d7ace60748dba41fc4633" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_968662b1feaf4caa687ab5c39ef" DEFAULT getdate(), "id_commerce" int, "id_wallet_bank" int, CONSTRAINT "PK_3752803678a35977db422b49212" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_a6f5fe61f04511b67874190048" ON "fm_wallet_commerce" ("id_commerce", "id_wallet_bank") `
		);
		await queryRunner.query(
			`CREATE TABLE "fm_commerce" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "ident_num" nvarchar(255), "special_contributor" int NOT NULL CONSTRAINT "DF_570da368aef9c63671ce1f44e7c" DEFAULT 1, "validate" int NOT NULL CONSTRAINT "DF_45fbb759cc69b65ae1c57dd68dd" DEFAULT 0, "rc_special_contributor" int, "rc_rif" int, "days" nvarchar(255), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_7c64c2fcc27eed02cf143287988" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_be25f9975b9c77baffb5ba88b7d" DEFAULT getdate(), "id_ident_type" int, "id_activity" int, "id_location" int, "id_aci" int, "id_client" int, CONSTRAINT "PK_a2d9f3677becc5e674531be2f03" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_ger7_parametrization" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "version" int NOT NULL, "desc" nvarchar(255), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_432204157ea16dc73fc98ab7f19" DEFAULT getdate(), CONSTRAINT "PK_949fc47b8cb521965931a0a7983" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_status_pos" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_64d700ce33668921394dc7045c4" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_59331bd12850f31195208e186a8" DEFAULT getdate(), CONSTRAINT "PK_a83d527c3a8c3ebe7c0a0eff6e8" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_types_telemarket" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_35a13d665915f4d5cc01b143f7f" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_5413a33696daeaa26c7d4762efa" DEFAULT getdate(), CONSTRAINT "PK_97fb56c5633fe6d8f8472c11fc7" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_telemercadeo" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255), "id_types_telemarket" int, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_d66198dbcb5d285eda9ba8484d6" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_27addecf80f276adf84eeb73b8f" DEFAULT getdate(), CONSTRAINT "PK_5c0c0104d2c48f4be207ea3ce55" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_product_photos_fm_photo" ("fmProductId" int NOT NULL, "fmPhotoId" int NOT NULL, CONSTRAINT "PK_96e83ac023b9c5c08917b64569b" PRIMARY KEY ("fmProductId", "fmPhotoId"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_aead3451c666d14e82ccc3c48b" ON "fm_product_photos_fm_photo" ("fmProductId") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_5c7a49c7769727f2a7161c16ee" ON "fm_product_photos_fm_photo" ("fmPhotoId") `
		);
		await queryRunner.query(
			`CREATE TABLE "fm_client_photos_fm_photo" ("fmClientId" int NOT NULL, "fmPhotoId" int NOT NULL, CONSTRAINT "PK_421451c3eab8a924eed3c54f67c" PRIMARY KEY ("fmClientId", "fmPhotoId"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f6c435979c0cb0f36c0694741b" ON "fm_client_photos_fm_photo" ("fmClientId") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_9d63958d62d8e50a075685c741" ON "fm_client_photos_fm_photo" ("fmPhotoId") `
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce_constitutive_act" ADD CONSTRAINT "FK_6331f365268dbf2df9ff0f9991e" FOREIGN KEY ("id_commerce") REFERENCES "fm_commerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce_constitutive_act" ADD CONSTRAINT "FK_44c80483329d8b67210918e9aa3" FOREIGN KEY ("id_photo") REFERENCES "fm_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_planilla" ADD CONSTRAINT "FK_d742495bc2bae44563b57144645" FOREIGN KEY ("id_request") REFERENCES "fm_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_planilla" ADD CONSTRAINT "FK_1522f88a907a771cc289415d68d" FOREIGN KEY ("id_photo") REFERENCES "fm_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_photo" ADD CONSTRAINT "FK_541d2a307418c4c8d256b8c3371" FOREIGN KEY ("id_status") REFERENCES "fm_status_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_photo" ADD CONSTRAINT "FK_f2bbbe05ebffdcb768131a549ce" FOREIGN KEY ("rcConstitutiveActId") REFERENCES "fm_commerce_constitutive_act"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_photo" ADD CONSTRAINT "FK_b183d41df081e7522d1a1b770d4" FOREIGN KEY ("rcPlanillaId") REFERENCES "fm_planilla"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_location" ADD CONSTRAINT "FK_d8abcf8574b525241b18f024f52" FOREIGN KEY ("id_direccion") REFERENCES "fm_direccion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_pos_xcommerce" ADD CONSTRAINT "FK_aa63f17ab82edd634677d89ebec" FOREIGN KEY ("id_location") REFERENCES "fm_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_pos_xcommerce" ADD CONSTRAINT "FK_5769011591bbe59d6d9eccc2898" FOREIGN KEY ("id_commerce") REFERENCES "fm_commerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_pos_xcommerce" ADD CONSTRAINT "FK_9f8f85a7c6e9a123fc69c32aba7" FOREIGN KEY ("id_request") REFERENCES "fm_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_pos_xcommerce" ADD CONSTRAINT "FK_83ae031aa9bd473345d07589462" FOREIGN KEY ("id_product") REFERENCES "fm_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_actions" ADD CONSTRAINT "FK_1887a416c317d046279b8380536" FOREIGN KEY ("id_department") REFERENCES "fm_department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_permissions" ADD CONSTRAINT "FK_09c1b4a3280d58aa85ac2916693" FOREIGN KEY ("id_department") REFERENCES "fm_department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_permissions" ADD CONSTRAINT "FK_c6b065b479e904ea7a539bc8e65" FOREIGN KEY ("id_rol") REFERENCES "fm_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_permissions" ADD CONSTRAINT "FK_4091c8dc975d7ec31b3e072bdbf" FOREIGN KEY ("id_action") REFERENCES "fm_actions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_access_views" ADD CONSTRAINT "FK_de7a60b842316e30e8f896becb7" FOREIGN KEY ("id_department") REFERENCES "fm_department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_access_views" ADD CONSTRAINT "FK_e7d9189eb92b1cdb07a92a6d0d0" FOREIGN KEY ("id_views") REFERENCES "fm_views"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_status" ADD CONSTRAINT "FK_fba8ef1cff94c2c7b202d6deb0d" FOREIGN KEY ("id_request") REFERENCES "fm_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_status" ADD CONSTRAINT "FK_65c1dc9c7cb36fda1f2cbf41d71" FOREIGN KEY ("id_department") REFERENCES "fm_department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_status" ADD CONSTRAINT "FK_c8e50e7831f97bb4247b9edd91a" FOREIGN KEY ("id_status_request") REFERENCES "fm_status_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_payment_book" ADD CONSTRAINT "FK_a6616065a97d1234c8cebb2842b" FOREIGN KEY ("id_quotas_calculated") REFERENCES "fm_quotas_calculated"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_quotas_calculated" ADD CONSTRAINT "FK_0673175b200532308fc36fd3185" FOREIGN KEY ("id_type_payment") REFERENCES "fm_type_payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_quotas_calculated" ADD CONSTRAINT "FK_47c08889ebe40f2671a747e6149" FOREIGN KEY ("id_request") REFERENCES "fm_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_valid_request" ADD CONSTRAINT "FK_a05ad32e9207f52c5deb67f96bb" FOREIGN KEY ("id_typedif_client") REFERENCES "fm_type_diferido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_valid_request" ADD CONSTRAINT "FK_ccad3e4197ca1dacd7404f801bf" FOREIGN KEY ("id_typedif_commerce") REFERENCES "fm_type_diferido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_valid_request" ADD CONSTRAINT "FK_beeaffb6d9f9c69a015901d23bc" FOREIGN KEY ("id_typedif_pos") REFERENCES "fm_type_diferido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_valid_request" ADD CONSTRAINT "FK_249b235eff4603ee7f5c88e7737" FOREIGN KEY ("id_typedif_ref_bank") REFERENCES "fm_type_diferido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_valid_request" ADD CONSTRAINT "FK_ef131ede3c9051cf9291be578e7" FOREIGN KEY ("id_typedif_comp_num") REFERENCES "fm_type_diferido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_valid_request" ADD CONSTRAINT "FK_c071181090fe633d36f4ab05d0a" FOREIGN KEY ("id_typedif_consitutive_acta") REFERENCES "fm_type_diferido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_valid_request" ADD CONSTRAINT "FK_04be458c06e51fc7b90f8adab31" FOREIGN KEY ("id_typedif_planilla") REFERENCES "fm_type_diferido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_valid_request" ADD CONSTRAINT "FK_e1bb4b882a35dd049b25249e136" FOREIGN KEY ("id_typedif_special_contributor") REFERENCES "fm_type_diferido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_680b2a0d78e2edb2fd85052e89a" FOREIGN KEY ("id_quotas_calculat") REFERENCES "fm_quotas_calculated"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_7af3f0d3b144b7d6a72ceac4073" FOREIGN KEY ("id_payment_method") REFERENCES "fm_payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_e58a708881405ef2655aef9fd81" FOREIGN KEY ("id_type_payment") REFERENCES "fm_type_payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_bd495da93173bc09fe6d62b98b5" FOREIGN KEY ("id_client") REFERENCES "fm_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_96c58e4419abc60056da31ef769" FOREIGN KEY ("id_commerce") REFERENCES "fm_commerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_88cdbf21a125980f977d82c27b1" FOREIGN KEY ("id_product") REFERENCES "fm_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_8e6a76c31cf8fb8ef74f4823e10" FOREIGN KEY ("id_type_request") REFERENCES "fm_type_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_f2cb8353f19c168725999701d7d" FOREIGN KEY ("id_request_origin") REFERENCES "fm_request_origin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_82416fb6e19b7157d05f08584fe" FOREIGN KEY ("id_valid_request") REFERENCES "fm_valid_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_c4efb1cf02f43090740926bb1fc" FOREIGN KEY ("rc_comp_dep") REFERENCES "fm_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_4f207c9a0e9645910383377f86d" FOREIGN KEY ("rc_ref_bank") REFERENCES "fm_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_company" ADD CONSTRAINT "FK_dbee0c02784ebe3f0c0330014b4" FOREIGN KEY ("id_commerce") REFERENCES "fm_worker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_aci_commerce" ADD CONSTRAINT "FK_30c2d9c55728a95e712e8373627" FOREIGN KEY ("id_commerce") REFERENCES "fm_commerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_aci_commerce" ADD CONSTRAINT "FK_fe4db5ac79802a647e0c50e7487" FOREIGN KEY ("id_worker") REFERENCES "fm_worker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_worker" ADD CONSTRAINT "FK_e018746d22c55fc0477298963ad" FOREIGN KEY ("id_ident_type") REFERENCES "fm_ident_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_worker" ADD CONSTRAINT "FK_93ed0b26dab2997d685e1ea0e56" FOREIGN KEY ("id_company") REFERENCES "fm_company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_worker" ADD CONSTRAINT "FK_b7651b1e49eddd73c4d3a78c0a3" FOREIGN KEY ("id_department") REFERENCES "fm_department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_worker" ADD CONSTRAINT "FK_17c07e619578d8c470dfe97e015" FOREIGN KEY ("id_rol") REFERENCES "fm_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_phone" ADD CONSTRAINT "FK_3796c0f20cddbfce6840776200f" FOREIGN KEY ("id_client") REFERENCES "fm_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_client" ADD CONSTRAINT "FK_a4d752b12018c7ffc6a64a65307" FOREIGN KEY ("id_ident_type") REFERENCES "fm_ident_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_client" ADD CONSTRAINT "FK_d71b075dc26d880338a4140df10" FOREIGN KEY ("rc_ident_card") REFERENCES "fm_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_client" ADD CONSTRAINT "FK_2429112946d86e74cfedf59fc6c" FOREIGN KEY ("id_location") REFERENCES "fm_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_bank_commerce" ADD CONSTRAINT "FK_f6a998bb3ed4eb4c244b9baa7f3" FOREIGN KEY ("id_commerce") REFERENCES "fm_commerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_bank_commerce" ADD CONSTRAINT "FK_1f3e4561151d389d052b818d1ac" FOREIGN KEY ("id_client") REFERENCES "fm_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_bank_commerce" ADD CONSTRAINT "FK_ac51278339d6ed7a4bcbb5bda7f" FOREIGN KEY ("id_bank") REFERENCES "fm_bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_afiliados" ADD CONSTRAINT "FK_d82f3abdbeb01e63fce48ca1953" FOREIGN KEY ("id_type_person") REFERENCES "fm_type_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_afiliados" ADD CONSTRAINT "FK_9d80d093a993a82cb4e7a1456ef" FOREIGN KEY ("id_bank") REFERENCES "fm_bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_activity" ADD CONSTRAINT "FK_7c7fad9604e8f103f82b763a11d" FOREIGN KEY ("id_afiliado") REFERENCES "fm_afiliados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_wallet_bank" ADD CONSTRAINT "FK_1a4a32f10d0fd6c77c6daab0f03" FOREIGN KEY ("id_redes_tms7") REFERENCES "fm_redes_tms7"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_wallet_commerce" ADD CONSTRAINT "FK_3e566a32cb01e4838db522963ac" FOREIGN KEY ("id_commerce") REFERENCES "fm_commerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_wallet_commerce" ADD CONSTRAINT "FK_7910e29c9565d49ed4c7f082b26" FOREIGN KEY ("id_wallet_bank") REFERENCES "fm_wallet_bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce" ADD CONSTRAINT "FK_363178079b89e15b47a66e5dbd0" FOREIGN KEY ("id_ident_type") REFERENCES "fm_ident_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce" ADD CONSTRAINT "FK_9d10e9066e2a479adcf4830e65b" FOREIGN KEY ("id_activity") REFERENCES "fm_activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce" ADD CONSTRAINT "FK_e74342f2c030e08992c56df0af9" FOREIGN KEY ("id_location") REFERENCES "fm_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce" ADD CONSTRAINT "FK_4933429781cd0ce9b4db32bd4ed" FOREIGN KEY ("id_aci") REFERENCES "aliados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce" ADD CONSTRAINT "FK_ae4a2f524f6c29e5d38f265f7ac" FOREIGN KEY ("id_client") REFERENCES "fm_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce" ADD CONSTRAINT "FK_fda6f61fd547b39dd9a0f763a72" FOREIGN KEY ("rc_special_contributor") REFERENCES "fm_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce" ADD CONSTRAINT "FK_b3206a85c5fc305b43202938a17" FOREIGN KEY ("rc_rif") REFERENCES "fm_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_telemercadeo" ADD CONSTRAINT "FK_f1aebd7f5aa328218de2d7c35f1" FOREIGN KEY ("id_types_telemarket") REFERENCES "fm_types_telemarket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_product_photos_fm_photo" ADD CONSTRAINT "FK_aead3451c666d14e82ccc3c48bc" FOREIGN KEY ("fmProductId") REFERENCES "fm_product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_product_photos_fm_photo" ADD CONSTRAINT "FK_5c7a49c7769727f2a7161c16ee0" FOREIGN KEY ("fmPhotoId") REFERENCES "fm_photo"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_client_photos_fm_photo" ADD CONSTRAINT "FK_f6c435979c0cb0f36c0694741b4" FOREIGN KEY ("fmClientId") REFERENCES "fm_client"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_client_photos_fm_photo" ADD CONSTRAINT "FK_9d63958d62d8e50a075685c7413" FOREIGN KEY ("fmPhotoId") REFERENCES "fm_photo"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "fm_client_photos_fm_photo" DROP CONSTRAINT "FK_9d63958d62d8e50a075685c7413"`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_client_photos_fm_photo" DROP CONSTRAINT "FK_f6c435979c0cb0f36c0694741b4"`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_product_photos_fm_photo" DROP CONSTRAINT "FK_5c7a49c7769727f2a7161c16ee0"`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_product_photos_fm_photo" DROP CONSTRAINT "FK_aead3451c666d14e82ccc3c48bc"`
		);
		await queryRunner.query(`ALTER TABLE "fm_telemercadeo" DROP CONSTRAINT "FK_f1aebd7f5aa328218de2d7c35f1"`);
		await queryRunner.query(`ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_b3206a85c5fc305b43202938a17"`);
		await queryRunner.query(`ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_fda6f61fd547b39dd9a0f763a72"`);
		await queryRunner.query(`ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_ae4a2f524f6c29e5d38f265f7ac"`);
		await queryRunner.query(`ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_4933429781cd0ce9b4db32bd4ed"`);
		await queryRunner.query(`ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_e74342f2c030e08992c56df0af9"`);
		await queryRunner.query(`ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_9d10e9066e2a479adcf4830e65b"`);
		await queryRunner.query(`ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_363178079b89e15b47a66e5dbd0"`);
		await queryRunner.query(`ALTER TABLE "fm_wallet_commerce" DROP CONSTRAINT "FK_7910e29c9565d49ed4c7f082b26"`);
		await queryRunner.query(`ALTER TABLE "fm_wallet_commerce" DROP CONSTRAINT "FK_3e566a32cb01e4838db522963ac"`);
		await queryRunner.query(`ALTER TABLE "fm_wallet_bank" DROP CONSTRAINT "FK_1a4a32f10d0fd6c77c6daab0f03"`);
		await queryRunner.query(`ALTER TABLE "fm_activity" DROP CONSTRAINT "FK_7c7fad9604e8f103f82b763a11d"`);
		await queryRunner.query(`ALTER TABLE "fm_afiliados" DROP CONSTRAINT "FK_9d80d093a993a82cb4e7a1456ef"`);
		await queryRunner.query(`ALTER TABLE "fm_afiliados" DROP CONSTRAINT "FK_d82f3abdbeb01e63fce48ca1953"`);
		await queryRunner.query(`ALTER TABLE "fm_bank_commerce" DROP CONSTRAINT "FK_ac51278339d6ed7a4bcbb5bda7f"`);
		await queryRunner.query(`ALTER TABLE "fm_bank_commerce" DROP CONSTRAINT "FK_1f3e4561151d389d052b818d1ac"`);
		await queryRunner.query(`ALTER TABLE "fm_bank_commerce" DROP CONSTRAINT "FK_f6a998bb3ed4eb4c244b9baa7f3"`);
		await queryRunner.query(`ALTER TABLE "fm_client" DROP CONSTRAINT "FK_2429112946d86e74cfedf59fc6c"`);
		await queryRunner.query(`ALTER TABLE "fm_client" DROP CONSTRAINT "FK_d71b075dc26d880338a4140df10"`);
		await queryRunner.query(`ALTER TABLE "fm_client" DROP CONSTRAINT "FK_a4d752b12018c7ffc6a64a65307"`);
		await queryRunner.query(`ALTER TABLE "fm_phone" DROP CONSTRAINT "FK_3796c0f20cddbfce6840776200f"`);
		await queryRunner.query(`ALTER TABLE "fm_worker" DROP CONSTRAINT "FK_17c07e619578d8c470dfe97e015"`);
		await queryRunner.query(`ALTER TABLE "fm_worker" DROP CONSTRAINT "FK_b7651b1e49eddd73c4d3a78c0a3"`);
		await queryRunner.query(`ALTER TABLE "fm_worker" DROP CONSTRAINT "FK_93ed0b26dab2997d685e1ea0e56"`);
		await queryRunner.query(`ALTER TABLE "fm_worker" DROP CONSTRAINT "FK_e018746d22c55fc0477298963ad"`);
		await queryRunner.query(`ALTER TABLE "fm_aci_commerce" DROP CONSTRAINT "FK_fe4db5ac79802a647e0c50e7487"`);
		await queryRunner.query(`ALTER TABLE "fm_aci_commerce" DROP CONSTRAINT "FK_30c2d9c55728a95e712e8373627"`);
		await queryRunner.query(`ALTER TABLE "fm_company" DROP CONSTRAINT "FK_dbee0c02784ebe3f0c0330014b4"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_4f207c9a0e9645910383377f86d"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_c4efb1cf02f43090740926bb1fc"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_82416fb6e19b7157d05f08584fe"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_f2cb8353f19c168725999701d7d"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_8e6a76c31cf8fb8ef74f4823e10"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_88cdbf21a125980f977d82c27b1"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_96c58e4419abc60056da31ef769"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_bd495da93173bc09fe6d62b98b5"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_e58a708881405ef2655aef9fd81"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_7af3f0d3b144b7d6a72ceac4073"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_680b2a0d78e2edb2fd85052e89a"`);
		await queryRunner.query(`ALTER TABLE "fm_valid_request" DROP CONSTRAINT "FK_e1bb4b882a35dd049b25249e136"`);
		await queryRunner.query(`ALTER TABLE "fm_valid_request" DROP CONSTRAINT "FK_04be458c06e51fc7b90f8adab31"`);
		await queryRunner.query(`ALTER TABLE "fm_valid_request" DROP CONSTRAINT "FK_c071181090fe633d36f4ab05d0a"`);
		await queryRunner.query(`ALTER TABLE "fm_valid_request" DROP CONSTRAINT "FK_ef131ede3c9051cf9291be578e7"`);
		await queryRunner.query(`ALTER TABLE "fm_valid_request" DROP CONSTRAINT "FK_249b235eff4603ee7f5c88e7737"`);
		await queryRunner.query(`ALTER TABLE "fm_valid_request" DROP CONSTRAINT "FK_beeaffb6d9f9c69a015901d23bc"`);
		await queryRunner.query(`ALTER TABLE "fm_valid_request" DROP CONSTRAINT "FK_ccad3e4197ca1dacd7404f801bf"`);
		await queryRunner.query(`ALTER TABLE "fm_valid_request" DROP CONSTRAINT "FK_a05ad32e9207f52c5deb67f96bb"`);
		await queryRunner.query(`ALTER TABLE "fm_quotas_calculated" DROP CONSTRAINT "FK_47c08889ebe40f2671a747e6149"`);
		await queryRunner.query(`ALTER TABLE "fm_quotas_calculated" DROP CONSTRAINT "FK_0673175b200532308fc36fd3185"`);
		await queryRunner.query(`ALTER TABLE "fm_payment_book" DROP CONSTRAINT "FK_a6616065a97d1234c8cebb2842b"`);
		await queryRunner.query(`ALTER TABLE "fm_status" DROP CONSTRAINT "FK_c8e50e7831f97bb4247b9edd91a"`);
		await queryRunner.query(`ALTER TABLE "fm_status" DROP CONSTRAINT "FK_65c1dc9c7cb36fda1f2cbf41d71"`);
		await queryRunner.query(`ALTER TABLE "fm_status" DROP CONSTRAINT "FK_fba8ef1cff94c2c7b202d6deb0d"`);
		await queryRunner.query(`ALTER TABLE "fm_access_views" DROP CONSTRAINT "FK_e7d9189eb92b1cdb07a92a6d0d0"`);
		await queryRunner.query(`ALTER TABLE "fm_access_views" DROP CONSTRAINT "FK_de7a60b842316e30e8f896becb7"`);
		await queryRunner.query(`ALTER TABLE "fm_permissions" DROP CONSTRAINT "FK_4091c8dc975d7ec31b3e072bdbf"`);
		await queryRunner.query(`ALTER TABLE "fm_permissions" DROP CONSTRAINT "FK_c6b065b479e904ea7a539bc8e65"`);
		await queryRunner.query(`ALTER TABLE "fm_permissions" DROP CONSTRAINT "FK_09c1b4a3280d58aa85ac2916693"`);
		await queryRunner.query(`ALTER TABLE "fm_actions" DROP CONSTRAINT "FK_1887a416c317d046279b8380536"`);
		await queryRunner.query(`ALTER TABLE "fm_pos_xcommerce" DROP CONSTRAINT "FK_83ae031aa9bd473345d07589462"`);
		await queryRunner.query(`ALTER TABLE "fm_pos_xcommerce" DROP CONSTRAINT "FK_9f8f85a7c6e9a123fc69c32aba7"`);
		await queryRunner.query(`ALTER TABLE "fm_pos_xcommerce" DROP CONSTRAINT "FK_5769011591bbe59d6d9eccc2898"`);
		await queryRunner.query(`ALTER TABLE "fm_pos_xcommerce" DROP CONSTRAINT "FK_aa63f17ab82edd634677d89ebec"`);
		await queryRunner.query(`ALTER TABLE "fm_location" DROP CONSTRAINT "FK_d8abcf8574b525241b18f024f52"`);
		await queryRunner.query(`ALTER TABLE "fm_photo" DROP CONSTRAINT "FK_b183d41df081e7522d1a1b770d4"`);
		await queryRunner.query(`ALTER TABLE "fm_photo" DROP CONSTRAINT "FK_f2bbbe05ebffdcb768131a549ce"`);
		await queryRunner.query(`ALTER TABLE "fm_photo" DROP CONSTRAINT "FK_541d2a307418c4c8d256b8c3371"`);
		await queryRunner.query(`ALTER TABLE "fm_planilla" DROP CONSTRAINT "FK_1522f88a907a771cc289415d68d"`);
		await queryRunner.query(`ALTER TABLE "fm_planilla" DROP CONSTRAINT "FK_d742495bc2bae44563b57144645"`);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce_constitutive_act" DROP CONSTRAINT "FK_44c80483329d8b67210918e9aa3"`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce_constitutive_act" DROP CONSTRAINT "FK_6331f365268dbf2df9ff0f9991e"`
		);
		await queryRunner.query(`DROP INDEX "IDX_9d63958d62d8e50a075685c741" ON "fm_client_photos_fm_photo"`);
		await queryRunner.query(`DROP INDEX "IDX_f6c435979c0cb0f36c0694741b" ON "fm_client_photos_fm_photo"`);
		await queryRunner.query(`DROP TABLE "fm_client_photos_fm_photo"`);
		await queryRunner.query(`DROP INDEX "IDX_5c7a49c7769727f2a7161c16ee" ON "fm_product_photos_fm_photo"`);
		await queryRunner.query(`DROP INDEX "IDX_aead3451c666d14e82ccc3c48b" ON "fm_product_photos_fm_photo"`);
		await queryRunner.query(`DROP TABLE "fm_product_photos_fm_photo"`);
		await queryRunner.query(`DROP TABLE "fm_telemercadeo"`);
		await queryRunner.query(`DROP TABLE "fm_types_telemarket"`);
		await queryRunner.query(`DROP TABLE "fm_status_pos"`);
		await queryRunner.query(`DROP TABLE "fm_ger7_parametrization"`);
		await queryRunner.query(`DROP TABLE "fm_commerce"`);
		await queryRunner.query(`DROP INDEX "IDX_a6f5fe61f04511b67874190048" ON "fm_wallet_commerce"`);
		await queryRunner.query(`DROP TABLE "fm_wallet_commerce"`);
		await queryRunner.query(`DROP TABLE "fm_wallet_bank"`);
		await queryRunner.query(`DROP TABLE "fm_redes_tms7"`);
		await queryRunner.query(`DROP TABLE "fm_activity"`);
		await queryRunner.query(`DROP TABLE "fm_afiliados"`);
		await queryRunner.query(`DROP TABLE "fm_type_person"`);
		await queryRunner.query(`DROP TABLE "fm_bank"`);
		await queryRunner.query(`DROP TABLE "fm_bank_commerce"`);
		await queryRunner.query(`DROP INDEX "IDX_15f756dc2a9a6aefe1751f731f" ON "fm_client"`);
		await queryRunner.query(`DROP TABLE "fm_client"`);
		await queryRunner.query(`DROP TABLE "fm_phone"`);
		await queryRunner.query(`DROP TABLE "fm_ident_type"`);
		await queryRunner.query(`DROP INDEX "IDX_7a21b1b04b3df8909ad71d8909" ON "fm_worker"`);
		await queryRunner.query(`DROP TABLE "fm_worker"`);
		await queryRunner.query(`DROP INDEX "REL_30c2d9c55728a95e712e837362" ON "fm_aci_commerce"`);
		await queryRunner.query(`DROP TABLE "fm_aci_commerce"`);
		await queryRunner.query(`DROP TABLE "fm_company"`);
		await queryRunner.query(`DROP INDEX "REL_82416fb6e19b7157d05f08584f" ON "fm_request"`);
		await queryRunner.query(`DROP INDEX "REL_680b2a0d78e2edb2fd85052e89" ON "fm_request"`);
		await queryRunner.query(`DROP TABLE "fm_request"`);
		await queryRunner.query(`DROP TABLE "fm_valid_request"`);
		await queryRunner.query(`DROP TABLE "fm_type_diferido"`);
		await queryRunner.query(`DROP TABLE "fm_type_payment"`);
		await queryRunner.query(`DROP INDEX "REL_47c08889ebe40f2671a747e614" ON "fm_quotas_calculated"`);
		await queryRunner.query(`DROP TABLE "fm_quotas_calculated"`);
		await queryRunner.query(`DROP TABLE "fm_payment_book"`);
		await queryRunner.query(`DROP TABLE "fm_status"`);
		await queryRunner.query(`DROP TABLE "fm_department"`);
		await queryRunner.query(`DROP INDEX "IDX_e5d03665f00b7b38f94a9c7f67" ON "fm_access_views"`);
		await queryRunner.query(`DROP TABLE "fm_access_views"`);
		await queryRunner.query(`DROP TABLE "fm_views"`);
		await queryRunner.query(`DROP INDEX "IDX_c9ff6a42bad0b6e7fc55202e8d" ON "fm_permissions"`);
		await queryRunner.query(`DROP TABLE "fm_permissions"`);
		await queryRunner.query(`DROP TABLE "fm_roles"`);
		await queryRunner.query(`DROP TABLE "fm_actions"`);
		await queryRunner.query(`DROP TABLE "fm_status_request"`);
		await queryRunner.query(`DROP TABLE "fm_request_origin"`);
		await queryRunner.query(`DROP TABLE "fm_product"`);
		await queryRunner.query(`DROP TABLE "fm_pos_xcommerce"`);
		await queryRunner.query(`DROP TABLE "fm_location"`);
		await queryRunner.query(`DROP TABLE "fm_payment_method"`);
		await queryRunner.query(`DROP INDEX "REL_b183d41df081e7522d1a1b770d" ON "fm_photo"`);
		await queryRunner.query(`DROP INDEX "REL_f2bbbe05ebffdcb768131a549c" ON "fm_photo"`);
		await queryRunner.query(`DROP TABLE "fm_photo"`);
		await queryRunner.query(`DROP TABLE "fm_status_photo"`);
		await queryRunner.query(`DROP TABLE "fm_planilla"`);
		await queryRunner.query(`DROP TABLE "fm_commerce_constitutive_act"`);
		await queryRunner.query(`DROP TABLE "fm_type_request"`);
	}
}
