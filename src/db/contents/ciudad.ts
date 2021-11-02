import { getRepository } from 'typeorm';
import fm_ciudad from '../models/fm_ciudad';

const ciudad = async (): Promise<void> => {
	const valid = await getRepository(fm_ciudad).findByIds([1]);
	if (!valid.length) {
		await getRepository(fm_ciudad).save([
			{ id: 1, id_estado: 1, ciudad: 'Maroa', capital: false },
			{ id: 2, id_estado: 1, ciudad: 'Puerto Ayacucho', capital: true },
			{ id: 3, id_estado: 1, ciudad: 'San Fernando de Atabapo', capital: false },
			{ id: 4, id_estado: 2, ciudad: 'Anaco', capital: false },
			{ id: 5, id_estado: 2, ciudad: 'Aragua de Barcelona', capital: false },
			{ id: 6, id_estado: 2, ciudad: 'Barcelona', capital: true },
			{ id: 7, id_estado: 2, ciudad: 'Boca de Uchire', capital: false },
			{ id: 8, id_estado: 2, ciudad: 'Cantaura', capital: false },
			{ id: 9, id_estado: 2, ciudad: 'Clarines', capital: false },
			{ id: 10, id_estado: 2, ciudad: 'El Chaparro', capital: false },
			{ id: 11, id_estado: 2, ciudad: 'El Pao Anzoátegui', capital: false },
			{ id: 12, id_estado: 2, ciudad: 'El Tigre', capital: false },
			{ id: 13, id_estado: 2, ciudad: 'El Tigrito', capital: false },
			{ id: 14, id_estado: 2, ciudad: 'Guanape', capital: false },
			{ id: 15, id_estado: 2, ciudad: 'Guanta', capital: false },
			{ id: 16, id_estado: 2, ciudad: 'Lechería', capital: false },
			{ id: 17, id_estado: 2, ciudad: 'Onoto', capital: false },
			{ id: 18, id_estado: 2, ciudad: 'Pariaguán', capital: false },
			{ id: 19, id_estado: 2, ciudad: 'Píritu', capital: false },
			{ id: 20, id_estado: 2, ciudad: 'Puerto La Cruz', capital: false },
			{ id: 21, id_estado: 2, ciudad: 'Puerto Píritu', capital: false },
			{ id: 22, id_estado: 2, ciudad: 'Sabana de Uchire', capital: false },
			{ id: 23, id_estado: 2, ciudad: 'San Mateo Anzoátegui', capital: false },
			{ id: 24, id_estado: 2, ciudad: 'San Pablo Anzoátegui', capital: false },
			{ id: 25, id_estado: 2, ciudad: 'San Tomé', capital: false },
			{ id: 26, id_estado: 2, ciudad: 'Santa Ana de Anzoátegui', capital: false },
			{ id: 27, id_estado: 2, ciudad: 'Santa Fe Anzoátegui', capital: false },
			{ id: 28, id_estado: 2, ciudad: 'Santa Rosa', capital: false },
			{ id: 29, id_estado: 2, ciudad: 'Soledad', capital: false },
			{ id: 30, id_estado: 2, ciudad: 'Urica', capital: false },
			{ id: 31, id_estado: 2, ciudad: 'Valle de Guanape', capital: false },
			{ id: 43, id_estado: 3, ciudad: 'Achaguas', capital: false },
			{ id: 44, id_estado: 3, ciudad: 'Biruaca', capital: false },
			{ id: 45, id_estado: 3, ciudad: 'Bruzual', capital: false },
			{ id: 46, id_estado: 3, ciudad: 'El Amparo', capital: false },
			{ id: 47, id_estado: 3, ciudad: 'El Nula', capital: false },
			{ id: 48, id_estado: 3, ciudad: 'Elorza', capital: false },
			{ id: 49, id_estado: 3, ciudad: 'Guasdualito', capital: false },
			{ id: 50, id_estado: 3, ciudad: 'Mantecal', capital: false },
			{ id: 51, id_estado: 3, ciudad: 'Puerto Páez', capital: false },
			{ id: 52, id_estado: 3, ciudad: 'San Fernando de Apure', capital: true },
			{ id: 53, id_estado: 3, ciudad: 'San Juan de Payara', capital: false },
			{ id: 54, id_estado: 4, ciudad: 'Barbacoas', capital: false },
			{ id: 55, id_estado: 4, ciudad: 'Cagua', capital: false },
			{ id: 56, id_estado: 4, ciudad: 'Camatagua', capital: false },
			{ id: 58, id_estado: 4, ciudad: 'Choroní', capital: false },
			{ id: 59, id_estado: 4, ciudad: 'Colonia Tovar', capital: false },
			{ id: 60, id_estado: 4, ciudad: 'El Consejo', capital: false },
			{ id: 61, id_estado: 4, ciudad: 'La Victoria', capital: false },
			{ id: 62, id_estado: 4, ciudad: 'Las Tejerías', capital: false },
			{ id: 63, id_estado: 4, ciudad: 'Magdaleno', capital: false },
			{ id: 64, id_estado: 4, ciudad: 'Maracay', capital: true },
			{ id: 65, id_estado: 4, ciudad: 'Ocumare de La Costa', capital: false },
			{ id: 66, id_estado: 4, ciudad: 'Palo Negro', capital: false },
			{ id: 67, id_estado: 4, ciudad: 'San Casimiro', capital: false },
			{ id: 68, id_estado: 4, ciudad: 'San Mateo', capital: false },
			{ id: 69, id_estado: 4, ciudad: 'San Sebastián', capital: false },
			{ id: 70, id_estado: 4, ciudad: 'Santa Cruz de Aragua', capital: false },
			{ id: 71, id_estado: 4, ciudad: 'Tocorón', capital: false },
			{ id: 72, id_estado: 4, ciudad: 'Turmero', capital: false },
			{ id: 73, id_estado: 4, ciudad: 'Villa de Cura', capital: false },
			{ id: 74, id_estado: 4, ciudad: 'Zuata', capital: false },
			{ id: 75, id_estado: 5, ciudad: 'Barinas', capital: true },
			{ id: 76, id_estado: 5, ciudad: 'Barinitas', capital: false },
			{ id: 77, id_estado: 5, ciudad: 'Barrancas', capital: false },
			{ id: 78, id_estado: 5, ciudad: 'Calderas', capital: false },
			{ id: 79, id_estado: 5, ciudad: 'Capitanejo', capital: false },
			{ id: 80, id_estado: 5, ciudad: 'Ciudad Bolivia', capital: false },
			{ id: 81, id_estado: 5, ciudad: 'El Cantón', capital: false },
			{ id: 82, id_estado: 5, ciudad: 'Las Veguitas', capital: false },
			{ id: 83, id_estado: 5, ciudad: 'Libertad de Barinas', capital: false },
			{ id: 84, id_estado: 5, ciudad: 'Sabaneta', capital: false },
			{ id: 85, id_estado: 5, ciudad: 'Santa Bárbara de Barinas', capital: false },
			{ id: 86, id_estado: 5, ciudad: 'Socopó', capital: false },
			{ id: 87, id_estado: 6, ciudad: 'Caicara del Orinoco', capital: false },
			{ id: 88, id_estado: 6, ciudad: 'Canaima', capital: false },
			{ id: 89, id_estado: 6, ciudad: 'Ciudad Bolívar', capital: true },
			{ id: 90, id_estado: 6, ciudad: 'Ciudad Piar', capital: false },
			{ id: 91, id_estado: 6, ciudad: 'El Callao', capital: false },
			{ id: 92, id_estado: 6, ciudad: 'El Dorado', capital: false },
			{ id: 93, id_estado: 6, ciudad: 'El Manteco', capital: false },
			{ id: 94, id_estado: 6, ciudad: 'El Palmar', capital: false },
			{ id: 95, id_estado: 6, ciudad: 'El Pao', capital: false },
			{ id: 96, id_estado: 6, ciudad: 'Guasipati', capital: false },
			{ id: 97, id_estado: 6, ciudad: 'Guri', capital: false },
			{ id: 98, id_estado: 6, ciudad: 'La Paragua', capital: false },
			{ id: 99, id_estado: 6, ciudad: 'Matanzas', capital: false },
			{ id: 100, id_estado: 6, ciudad: 'Puerto Ordaz', capital: false },
			{ id: 101, id_estado: 6, ciudad: 'San Félix', capital: false },
			{ id: 102, id_estado: 6, ciudad: 'Santa Elena de Uairén', capital: false },
			{ id: 103, id_estado: 6, ciudad: 'Tumeremo', capital: false },
			{ id: 104, id_estado: 6, ciudad: 'Unare', capital: false },
			{ id: 105, id_estado: 6, ciudad: 'Upata', capital: false },
			{ id: 106, id_estado: 7, ciudad: 'Bejuma', capital: false },
			{ id: 107, id_estado: 7, ciudad: 'Belén', capital: false },
			{ id: 108, id_estado: 7, ciudad: 'Campo de Carabobo', capital: false },
			{ id: 109, id_estado: 7, ciudad: 'Canoabo', capital: false },
			{ id: 110, id_estado: 7, ciudad: 'Central Tacarigua', capital: false },
			{ id: 111, id_estado: 7, ciudad: 'Chirgua', capital: false },
			{ id: 112, id_estado: 7, ciudad: 'Ciudad Alianza', capital: false },
			{ id: 113, id_estado: 7, ciudad: 'El Palito', capital: false },
			{ id: 114, id_estado: 7, ciudad: 'Guacara', capital: false },
			{ id: 115, id_estado: 7, ciudad: 'Guigue', capital: false },
			{ id: 116, id_estado: 7, ciudad: 'Las Trincheras', capital: false },
			{ id: 117, id_estado: 7, ciudad: 'Los Guayos', capital: false },
			{ id: 118, id_estado: 7, ciudad: 'Mariara', capital: false },
			{ id: 119, id_estado: 7, ciudad: 'Miranda', capital: false },
			{ id: 120, id_estado: 7, ciudad: 'Montalbán', capital: false },
			{ id: 121, id_estado: 7, ciudad: 'Morón', capital: false },
			{ id: 122, id_estado: 7, ciudad: 'Naguanagua', capital: false },
			{ id: 123, id_estado: 7, ciudad: 'Puerto Cabello', capital: false },
			{ id: 124, id_estado: 7, ciudad: 'San Joaquín', capital: false },
			{ id: 125, id_estado: 7, ciudad: 'Tocuyito', capital: false },
			{ id: 126, id_estado: 7, ciudad: 'Urama', capital: false },
			{ id: 127, id_estado: 7, ciudad: 'Valencia', capital: true },
			{ id: 128, id_estado: 7, ciudad: 'Vigirimita', capital: false },
			{ id: 129, id_estado: 8, ciudad: 'Aguirre', capital: false },
			{ id: 130, id_estado: 8, ciudad: 'Apartaderos Cojedes', capital: false },
			{ id: 131, id_estado: 8, ciudad: 'Arismendi', capital: false },
			{ id: 132, id_estado: 8, ciudad: 'Camuriquito', capital: false },
			{ id: 133, id_estado: 8, ciudad: 'El Baúl', capital: false },
			{ id: 134, id_estado: 8, ciudad: 'El Limón', capital: false },
			{ id: 135, id_estado: 8, ciudad: 'El Pao Cojedes', capital: false },
			{ id: 136, id_estado: 8, ciudad: 'El Socorro', capital: false },
			{ id: 137, id_estado: 8, ciudad: 'La Aguadita', capital: false },
			{ id: 138, id_estado: 8, ciudad: 'Las Vegas', capital: false },
			{ id: 139, id_estado: 8, ciudad: 'Libertad de Cojedes', capital: false },
			{ id: 140, id_estado: 8, ciudad: 'Mapuey', capital: false },
			{ id: 141, id_estado: 8, ciudad: 'Piñedo', capital: false },
			{ id: 142, id_estado: 8, ciudad: 'Samancito', capital: false },
			{ id: 143, id_estado: 8, ciudad: 'San Carlos', capital: true },
			{ id: 144, id_estado: 8, ciudad: 'Sucre', capital: false },
			{ id: 145, id_estado: 8, ciudad: 'Tinaco', capital: false },
			{ id: 146, id_estado: 8, ciudad: 'Tinaquillo', capital: false },
			{ id: 147, id_estado: 8, ciudad: 'Vallecito', capital: false },
			{ id: 148, id_estado: 9, ciudad: 'Tucupita', capital: true },
			{ id: 149, id_estado: 24, ciudad: 'Caracas', capital: true },
			{ id: 150, id_estado: 24, ciudad: 'El Junquito', capital: false },
			{ id: 151, id_estado: 10, ciudad: 'Adícora', capital: false },
			{ id: 152, id_estado: 10, ciudad: 'Boca de Aroa', capital: false },
			{ id: 153, id_estado: 10, ciudad: 'Cabure', capital: false },
			{ id: 154, id_estado: 10, ciudad: 'Capadare', capital: false },
			{ id: 155, id_estado: 10, ciudad: 'Capatárida', capital: false },
			{ id: 156, id_estado: 10, ciudad: 'Chichiriviche', capital: false },
			{ id: 157, id_estado: 10, ciudad: 'Churuguara', capital: false },
			{ id: 158, id_estado: 10, ciudad: 'Coro', capital: true },
			{ id: 159, id_estado: 10, ciudad: 'Cumarebo', capital: false },
			{ id: 160, id_estado: 10, ciudad: 'Dabajuro', capital: false },
			{ id: 161, id_estado: 10, ciudad: 'Judibana', capital: false },
			{ id: 162, id_estado: 10, ciudad: 'La Cruz de Taratara', capital: false },
			{ id: 163, id_estado: 10, ciudad: 'La Vela de Coro', capital: false },
			{ id: 164, id_estado: 10, ciudad: 'Los Taques', capital: false },
			{ id: 165, id_estado: 10, ciudad: 'Maparari', capital: false },
			{ id: 166, id_estado: 10, ciudad: 'Mene de Mauroa', capital: false },
			{ id: 167, id_estado: 10, ciudad: 'Mirimire', capital: false },
			{ id: 168, id_estado: 10, ciudad: 'Pedregal', capital: false },
			{ id: 169, id_estado: 10, ciudad: 'Píritu Falcón', capital: false },
			{ id: 170, id_estado: 10, ciudad: 'Pueblo Nuevo Falcón', capital: false },
			{ id: 171, id_estado: 10, ciudad: 'Puerto Cumarebo', capital: false },
			{ id: 172, id_estado: 10, ciudad: 'Punta Cardón', capital: false },
			{ id: 173, id_estado: 10, ciudad: 'Punto Fijo', capital: false },
			{ id: 174, id_estado: 10, ciudad: 'San Juan de Los Cayos', capital: false },
			{ id: 175, id_estado: 10, ciudad: 'San Luis', capital: false },
			{ id: 176, id_estado: 10, ciudad: 'Santa Ana Falcón', capital: false },
			{ id: 177, id_estado: 10, ciudad: 'Santa Cruz De Bucaral', capital: false },
			{ id: 178, id_estado: 10, ciudad: 'Tocopero', capital: false },
			{ id: 179, id_estado: 10, ciudad: 'Tocuyo de La Costa', capital: false },
			{ id: 180, id_estado: 10, ciudad: 'Tucacas', capital: false },
			{ id: 181, id_estado: 10, ciudad: 'Yaracal', capital: false },
			{ id: 182, id_estado: 11, ciudad: 'Altagracia de Orituco', capital: false },
			{ id: 183, id_estado: 11, ciudad: 'Cabruta', capital: false },
			{ id: 184, id_estado: 11, ciudad: 'Calabozo', capital: false },
			{ id: 185, id_estado: 11, ciudad: 'Camaguán', capital: false },
			{ id: 196, id_estado: 11, ciudad: 'Chaguaramas Guárico', capital: false },
			{ id: 197, id_estado: 11, ciudad: 'El Socorro', capital: false },
			{ id: 198, id_estado: 11, ciudad: 'El Sombrero', capital: false },
			{ id: 199, id_estado: 11, ciudad: 'Las Mercedes de Los Llanos', capital: false },
			{ id: 200, id_estado: 11, ciudad: 'Lezama', capital: false },
			{ id: 201, id_estado: 11, ciudad: 'Onoto', capital: false },
			{ id: 202, id_estado: 11, ciudad: 'Ortíz', capital: false },
			{ id: 203, id_estado: 11, ciudad: 'San José de Guaribe', capital: false },
			{ id: 204, id_estado: 11, ciudad: 'San Juan de Los Morros', capital: true },
			{ id: 205, id_estado: 11, ciudad: 'San Rafael de Laya', capital: false },
			{ id: 206, id_estado: 11, ciudad: 'Santa María de Ipire', capital: false },
			{ id: 207, id_estado: 11, ciudad: 'Tucupido', capital: false },
			{ id: 208, id_estado: 11, ciudad: 'Valle de La Pascua', capital: false },
			{ id: 209, id_estado: 11, ciudad: 'Zaraza', capital: false },
			{ id: 210, id_estado: 12, ciudad: 'Aguada Grande', capital: false },
			{ id: 211, id_estado: 12, ciudad: 'Atarigua', capital: false },
			{ id: 212, id_estado: 12, ciudad: 'Barquisimeto', capital: true },
			{ id: 213, id_estado: 12, ciudad: 'Bobare', capital: false },
			{ id: 214, id_estado: 12, ciudad: 'Cabudare', capital: false },
			{ id: 215, id_estado: 12, ciudad: 'Carora', capital: false },
			{ id: 216, id_estado: 12, ciudad: 'Cubiro', capital: false },
			{ id: 217, id_estado: 12, ciudad: 'Cují', capital: false },
			{ id: 218, id_estado: 12, ciudad: 'Duaca', capital: false },
			{ id: 219, id_estado: 12, ciudad: 'El Manzano', capital: false },
			{ id: 220, id_estado: 12, ciudad: 'El Tocuyo', capital: false },
			{ id: 221, id_estado: 12, ciudad: 'Guaríco', capital: false },
			{ id: 222, id_estado: 12, ciudad: 'Humocaro Alto', capital: false },
			{ id: 223, id_estado: 12, ciudad: 'Humocaro Bajo', capital: false },
			{ id: 224, id_estado: 12, ciudad: 'La Miel', capital: false },
			{ id: 225, id_estado: 12, ciudad: 'Moroturo', capital: false },
			{ id: 226, id_estado: 12, ciudad: 'Quíbor', capital: false },
			{ id: 227, id_estado: 12, ciudad: 'Río Claro', capital: false },
			{ id: 228, id_estado: 12, ciudad: 'Sanare', capital: false },
			{ id: 229, id_estado: 12, ciudad: 'Santa Inés', capital: false },
			{ id: 230, id_estado: 12, ciudad: 'Sarare', capital: false },
			{ id: 231, id_estado: 12, ciudad: 'Siquisique', capital: false },
			{ id: 232, id_estado: 12, ciudad: 'Tintorero', capital: false },
			{ id: 233, id_estado: 13, ciudad: 'Apartaderos Mérida', capital: false },
			{ id: 234, id_estado: 13, ciudad: 'Arapuey', capital: false },
			{ id: 235, id_estado: 13, ciudad: 'Bailadores', capital: false },
			{ id: 236, id_estado: 13, ciudad: 'Caja Seca', capital: false },
			{ id: 237, id_estado: 13, ciudad: 'Canaguá', capital: false },
			{ id: 238, id_estado: 13, ciudad: 'Chachopo', capital: false },
			{ id: 239, id_estado: 13, ciudad: 'Chiguara', capital: false },
			{ id: 240, id_estado: 13, ciudad: 'Ejido', capital: false },
			{ id: 241, id_estado: 13, ciudad: 'El Vigía', capital: false },
			{ id: 242, id_estado: 13, ciudad: 'La Azulita', capital: false },
			{ id: 243, id_estado: 13, ciudad: 'La Playa', capital: false },
			{ id: 244, id_estado: 13, ciudad: 'Lagunillas Mérida', capital: false },
			{ id: 245, id_estado: 13, ciudad: 'Mérida', capital: true },
			{ id: 246, id_estado: 13, ciudad: 'Mesa de Bolívar', capital: false },
			{ id: 247, id_estado: 13, ciudad: 'Mucuchíes', capital: false },
			{ id: 248, id_estado: 13, ciudad: 'Mucujepe', capital: false },
			{ id: 249, id_estado: 13, ciudad: 'Mucuruba', capital: false },
			{ id: 250, id_estado: 13, ciudad: 'Nueva Bolivia', capital: false },
			{ id: 251, id_estado: 13, ciudad: 'Palmarito', capital: false },
			{ id: 252, id_estado: 13, ciudad: 'Pueblo Llano', capital: false },
			{ id: 253, id_estado: 13, ciudad: 'Santa Cruz de Mora', capital: false },
			{ id: 254, id_estado: 13, ciudad: 'Santa Elena de Arenales', capital: false },
			{ id: 255, id_estado: 13, ciudad: 'Santo Domingo', capital: false },
			{ id: 256, id_estado: 13, ciudad: 'Tabáy', capital: false },
			{ id: 257, id_estado: 13, ciudad: 'Timotes', capital: false },
			{ id: 258, id_estado: 13, ciudad: 'Torondoy', capital: false },
			{ id: 259, id_estado: 13, ciudad: 'Tovar', capital: false },
			{ id: 260, id_estado: 13, ciudad: 'Tucani', capital: false },
			{ id: 261, id_estado: 13, ciudad: 'Zea', capital: false },
			{ id: 262, id_estado: 14, ciudad: 'Araguita', capital: false },
			{ id: 263, id_estado: 14, ciudad: 'Carrizal', capital: false },
			{ id: 264, id_estado: 14, ciudad: 'Caucagua', capital: false },
			{ id: 265, id_estado: 14, ciudad: 'Chaguaramas Miranda', capital: false },
			{ id: 266, id_estado: 14, ciudad: 'Charallave', capital: false },
			{ id: 267, id_estado: 14, ciudad: 'Chirimena', capital: false },
			{ id: 268, id_estado: 14, ciudad: 'Chuspa', capital: false },
			{ id: 269, id_estado: 14, ciudad: 'Cúa', capital: false },
			{ id: 270, id_estado: 14, ciudad: 'Cupira', capital: false },
			{ id: 271, id_estado: 14, ciudad: 'Curiepe', capital: false },
			{ id: 272, id_estado: 14, ciudad: 'El Guapo', capital: false },
			{ id: 273, id_estado: 14, ciudad: 'El Jarillo', capital: false },
			{ id: 274, id_estado: 14, ciudad: 'Filas de Mariche', capital: false },
			{ id: 275, id_estado: 14, ciudad: 'Guarenas', capital: false },
			{ id: 276, id_estado: 14, ciudad: 'Guatire', capital: false },
			{ id: 277, id_estado: 14, ciudad: 'Higuerote', capital: false },
			{ id: 278, id_estado: 14, ciudad: 'Los Anaucos', capital: false },
			{ id: 279, id_estado: 14, ciudad: 'Los Teques', capital: true },
			{ id: 280, id_estado: 14, ciudad: 'Ocumare del Tuy', capital: false },
			{ id: 281, id_estado: 14, ciudad: 'Panaquire', capital: false },
			{ id: 282, id_estado: 14, ciudad: 'Paracotos', capital: false },
			{ id: 283, id_estado: 14, ciudad: 'Río Chico', capital: false },
			{ id: 284, id_estado: 14, ciudad: 'San Antonio de Los Altos', capital: false },
			{ id: 285, id_estado: 14, ciudad: 'San Diego de Los Altos', capital: false },
			{ id: 286, id_estado: 14, ciudad: 'San Fernando del Guapo', capital: false },
			{ id: 287, id_estado: 14, ciudad: 'San Francisco de Yare', capital: false },
			{ id: 288, id_estado: 14, ciudad: 'San José de Los Altos', capital: false },
			{ id: 289, id_estado: 14, ciudad: 'San José de Río Chico', capital: false },
			{ id: 290, id_estado: 14, ciudad: 'San Pedro de Los Altos', capital: false },
			{ id: 291, id_estado: 14, ciudad: 'Santa Lucía', capital: false },
			{ id: 292, id_estado: 14, ciudad: 'Santa Teresa', capital: false },
			{ id: 293, id_estado: 14, ciudad: 'Tacarigua de La Laguna', capital: false },
			{ id: 294, id_estado: 14, ciudad: 'Tacarigua de Mamporal', capital: false },
			{ id: 295, id_estado: 14, ciudad: 'Tácata', capital: false },
			{ id: 296, id_estado: 14, ciudad: 'Turumo', capital: false },
			{ id: 297, id_estado: 15, ciudad: 'Aguasay', capital: false },
			{ id: 298, id_estado: 15, ciudad: 'Aragua de Maturín', capital: false },
			{ id: 299, id_estado: 15, ciudad: 'Barrancas del Orinoco', capital: false },
			{ id: 300, id_estado: 15, ciudad: 'Caicara de Maturín', capital: false },
			{ id: 301, id_estado: 15, ciudad: 'Caripe', capital: false },
			{ id: 302, id_estado: 15, ciudad: 'Caripito', capital: false },
			{ id: 303, id_estado: 15, ciudad: 'Chaguaramal', capital: false },
			{ id: 305, id_estado: 15, ciudad: 'Chaguaramas Monagas', capital: false },
			{ id: 307, id_estado: 15, ciudad: 'El Furrial', capital: false },
			{ id: 308, id_estado: 15, ciudad: 'El Tejero', capital: false },
			{ id: 309, id_estado: 15, ciudad: 'Jusepín', capital: false },
			{ id: 310, id_estado: 15, ciudad: 'La Toscana', capital: false },
			{ id: 311, id_estado: 15, ciudad: 'Maturín', capital: true },
			{ id: 312, id_estado: 15, ciudad: 'Miraflores', capital: false },
			{ id: 313, id_estado: 15, ciudad: 'Punta de Mata', capital: false },
			{ id: 314, id_estado: 15, ciudad: 'Quiriquire', capital: false },
			{ id: 315, id_estado: 15, ciudad: 'San Antonio de Maturín', capital: false },
			{ id: 316, id_estado: 15, ciudad: 'San Vicente Monagas', capital: false },
			{ id: 317, id_estado: 15, ciudad: 'Santa Bárbara', capital: false },
			{ id: 318, id_estado: 15, ciudad: 'Temblador', capital: false },
			{ id: 319, id_estado: 15, ciudad: 'Teresen', capital: false },
			{ id: 320, id_estado: 15, ciudad: 'Uracoa', capital: false },
			{ id: 321, id_estado: 16, ciudad: 'Altagracia', capital: false },
			{ id: 322, id_estado: 16, ciudad: 'Boca de Pozo', capital: false },
			{ id: 323, id_estado: 16, ciudad: 'Boca de Río', capital: false },
			{ id: 324, id_estado: 16, ciudad: 'El Espinal', capital: false },
			{ id: 325, id_estado: 16, ciudad: 'El Valle del Espíritu Santo', capital: false },
			{ id: 326, id_estado: 16, ciudad: 'El Yaque', capital: false },
			{ id: 327, id_estado: 16, ciudad: 'Juangriego', capital: false },
			{ id: 328, id_estado: 16, ciudad: 'La Asunción', capital: true },
			{ id: 329, id_estado: 16, ciudad: 'La Guardia', capital: false },
			{ id: 330, id_estado: 16, ciudad: 'Pampatar', capital: false },
			{ id: 331, id_estado: 16, ciudad: 'Porlamar', capital: false },
			{ id: 332, id_estado: 16, ciudad: 'Puerto Fermín', capital: false },
			{ id: 333, id_estado: 16, ciudad: 'Punta de Piedras', capital: false },
			{ id: 334, id_estado: 16, ciudad: 'San Francisco de Macanao', capital: false },
			{ id: 335, id_estado: 16, ciudad: 'San Juan Bautista', capital: false },
			{ id: 336, id_estado: 16, ciudad: 'San Pedro de Coche', capital: false },
			{ id: 337, id_estado: 16, ciudad: 'Santa Ana de Nueva Esparta', capital: false },
			{ id: 338, id_estado: 16, ciudad: 'Villa Rosa', capital: false },
			{ id: 339, id_estado: 17, ciudad: 'Acarigua', capital: false },
			{ id: 340, id_estado: 17, ciudad: 'Agua Blanca', capital: false },
			{ id: 341, id_estado: 17, ciudad: 'Araure', capital: false },
			{ id: 342, id_estado: 17, ciudad: 'Biscucuy', capital: false },
			{ id: 343, id_estado: 17, ciudad: 'Boconoito', capital: false },
			{ id: 344, id_estado: 17, ciudad: 'Campo Elías', capital: false },
			{ id: 345, id_estado: 17, ciudad: 'Chabasquén', capital: false },
			{ id: 346, id_estado: 17, ciudad: 'Guanare', capital: true },
			{ id: 347, id_estado: 17, ciudad: 'Guanarito', capital: false },
			{ id: 348, id_estado: 17, ciudad: 'La Aparición', capital: false },
			{ id: 349, id_estado: 17, ciudad: 'La Misión', capital: false },
			{ id: 350, id_estado: 17, ciudad: 'Mesa de Cavacas', capital: false },
			{ id: 351, id_estado: 17, ciudad: 'Ospino', capital: false },
			{ id: 352, id_estado: 17, ciudad: 'Papelón', capital: false },
			{ id: 353, id_estado: 17, ciudad: 'Payara', capital: false },
			{ id: 354, id_estado: 17, ciudad: 'Pimpinela', capital: false },
			{ id: 355, id_estado: 17, ciudad: 'Píritu de Portuguesa', capital: false },
			{ id: 356, id_estado: 17, ciudad: 'San Rafael de Onoto', capital: false },
			{ id: 357, id_estado: 17, ciudad: 'Santa Rosalía', capital: false },
			{ id: 358, id_estado: 17, ciudad: 'Turén', capital: false },
			{ id: 359, id_estado: 18, ciudad: 'Altos de Sucre', capital: false },
			{ id: 360, id_estado: 18, ciudad: 'Araya', capital: false },
			{ id: 361, id_estado: 18, ciudad: 'Cariaco', capital: false },
			{ id: 362, id_estado: 18, ciudad: 'Carúpano', capital: false },
			{ id: 363, id_estado: 18, ciudad: 'Casanay', capital: false },
			{ id: 364, id_estado: 18, ciudad: 'Cumaná', capital: true },
			{ id: 365, id_estado: 18, ciudad: 'Cumanacoa', capital: false },
			{ id: 366, id_estado: 18, ciudad: 'El Morro Puerto Santo', capital: false },
			{ id: 367, id_estado: 18, ciudad: 'El Pilar', capital: false },
			{ id: 368, id_estado: 18, ciudad: 'El Poblado', capital: false },
			{ id: 369, id_estado: 18, ciudad: 'Guaca', capital: false },
			{ id: 370, id_estado: 18, ciudad: 'Guiria', capital: false },
			{ id: 371, id_estado: 18, ciudad: 'Irapa', capital: false },
			{ id: 372, id_estado: 18, ciudad: 'Manicuare', capital: false },
			{ id: 373, id_estado: 18, ciudad: 'Mariguitar', capital: false },
			{ id: 374, id_estado: 18, ciudad: 'Río Caribe', capital: false },
			{ id: 375, id_estado: 18, ciudad: 'San Antonio del Golfo', capital: false },
			{ id: 376, id_estado: 18, ciudad: 'San José de Aerocuar', capital: false },
			{ id: 377, id_estado: 18, ciudad: 'San Vicente de Sucre', capital: false },
			{ id: 378, id_estado: 18, ciudad: 'Santa Fe de Sucre', capital: false },
			{ id: 379, id_estado: 18, ciudad: 'Tunapuy', capital: false },
			{ id: 380, id_estado: 18, ciudad: 'Yaguaraparo', capital: false },
			{ id: 381, id_estado: 18, ciudad: 'Yoco', capital: false },
			{ id: 382, id_estado: 19, ciudad: 'Abejales', capital: false },
			{ id: 383, id_estado: 19, ciudad: 'Borota', capital: false },
			{ id: 384, id_estado: 19, ciudad: 'Bramon', capital: false },
			{ id: 385, id_estado: 19, ciudad: 'Capacho', capital: false },
			{ id: 386, id_estado: 19, ciudad: 'Colón', capital: false },
			{ id: 387, id_estado: 19, ciudad: 'Coloncito', capital: false },
			{ id: 388, id_estado: 19, ciudad: 'Cordero', capital: false },
			{ id: 389, id_estado: 19, ciudad: 'El Cobre', capital: false },
			{ id: 390, id_estado: 19, ciudad: 'El Pinal', capital: false },
			{ id: 391, id_estado: 19, ciudad: 'Independencia', capital: false },
			{ id: 392, id_estado: 19, ciudad: 'La Fría', capital: false },
			{ id: 393, id_estado: 19, ciudad: 'La Grita', capital: false },
			{ id: 394, id_estado: 19, ciudad: 'La Pedrera', capital: false },
			{ id: 395, id_estado: 19, ciudad: 'La Tendida', capital: false },
			{ id: 396, id_estado: 19, ciudad: 'Las Delicias', capital: false },
			{ id: 397, id_estado: 19, ciudad: 'Las Hernández', capital: false },
			{ id: 398, id_estado: 19, ciudad: 'Lobatera', capital: false },
			{ id: 399, id_estado: 19, ciudad: 'Michelena', capital: false },
			{ id: 400, id_estado: 19, ciudad: 'Palmira', capital: false },
			{ id: 401, id_estado: 19, ciudad: 'Pregonero', capital: false },
			{ id: 402, id_estado: 19, ciudad: 'Queniquea', capital: false },
			{ id: 403, id_estado: 19, ciudad: 'Rubio', capital: false },
			{ id: 404, id_estado: 19, ciudad: 'San Antonio del Tachira', capital: false },
			{ id: 405, id_estado: 19, ciudad: 'San Cristobal', capital: true },
			{ id: 406, id_estado: 19, ciudad: 'San José de Bolívar', capital: false },
			{ id: 407, id_estado: 19, ciudad: 'San Josecito', capital: false },
			{ id: 408, id_estado: 19, ciudad: 'San Pedro del Río', capital: false },
			{ id: 409, id_estado: 19, ciudad: 'Santa Ana Táchira', capital: false },
			{ id: 410, id_estado: 19, ciudad: 'Seboruco', capital: false },
			{ id: 411, id_estado: 19, ciudad: 'Táriba', capital: false },
			{ id: 412, id_estado: 19, ciudad: 'Umuquena', capital: false },
			{ id: 413, id_estado: 19, ciudad: 'Ureña', capital: false },
			{ id: 414, id_estado: 20, ciudad: 'Batatal', capital: false },
			{ id: 415, id_estado: 20, ciudad: 'Betijoque', capital: false },
			{ id: 416, id_estado: 20, ciudad: 'Boconó', capital: false },
			{ id: 417, id_estado: 20, ciudad: 'Carache', capital: false },
			{ id: 418, id_estado: 20, ciudad: 'Chejende', capital: false },
			{ id: 419, id_estado: 20, ciudad: 'Cuicas', capital: false },
			{ id: 420, id_estado: 20, ciudad: 'El Dividive', capital: false },
			{ id: 421, id_estado: 20, ciudad: 'El Jaguito', capital: false },
			{ id: 422, id_estado: 20, ciudad: 'Escuque', capital: false },
			{ id: 423, id_estado: 20, ciudad: 'Isnotú', capital: false },
			{ id: 424, id_estado: 20, ciudad: 'Jajó', capital: false },
			{ id: 425, id_estado: 20, ciudad: 'La Ceiba', capital: false },
			{ id: 426, id_estado: 20, ciudad: 'La Concepción de Trujllo', capital: false },
			{ id: 427, id_estado: 20, ciudad: 'La Mesa de Esnujaque', capital: false },
			{ id: 428, id_estado: 20, ciudad: 'La Puerta', capital: false },
			{ id: 429, id_estado: 20, ciudad: 'La Quebrada', capital: false },
			{ id: 430, id_estado: 20, ciudad: 'Mendoza Fría', capital: false },
			{ id: 431, id_estado: 20, ciudad: 'Meseta de Chimpire', capital: false },
			{ id: 432, id_estado: 20, ciudad: 'Monay', capital: false },
			{ id: 433, id_estado: 20, ciudad: 'Motatán', capital: false },
			{ id: 434, id_estado: 20, ciudad: 'Pampán', capital: false },
			{ id: 435, id_estado: 20, ciudad: 'Pampanito', capital: false },
			{ id: 436, id_estado: 20, ciudad: 'Sabana de Mendoza', capital: false },
			{ id: 437, id_estado: 20, ciudad: 'San Lázaro', capital: false },
			{ id: 438, id_estado: 20, ciudad: 'Santa Ana de Trujillo', capital: false },
			{ id: 439, id_estado: 20, ciudad: 'Tostós', capital: false },
			{ id: 440, id_estado: 20, ciudad: 'Trujillo', capital: true },
			{ id: 441, id_estado: 20, ciudad: 'Valera', capital: false },
			{ id: 442, id_estado: 21, ciudad: 'Carayaca', capital: false },
			{ id: 443, id_estado: 21, ciudad: 'Litoral', capital: false },
			{ id: 444, id_estado: 25, ciudad: 'Archipiélago Los Roques', capital: false },
			{ id: 445, id_estado: 22, ciudad: 'Aroa', capital: false },
			{ id: 446, id_estado: 22, ciudad: 'Boraure', capital: false },
			{ id: 447, id_estado: 22, ciudad: 'Campo Elías de Yaracuy', capital: false },
			{ id: 448, id_estado: 22, ciudad: 'Chivacoa', capital: false },
			{ id: 449, id_estado: 22, ciudad: 'Cocorote', capital: false },
			{ id: 450, id_estado: 22, ciudad: 'Farriar', capital: false },
			{ id: 451, id_estado: 22, ciudad: 'Guama', capital: false },
			{ id: 452, id_estado: 22, ciudad: 'Marín', capital: false },
			{ id: 453, id_estado: 22, ciudad: 'Nirgua', capital: false },
			{ id: 454, id_estado: 22, ciudad: 'Sabana de Parra', capital: false },
			{ id: 455, id_estado: 22, ciudad: 'Salom', capital: false },
			{ id: 456, id_estado: 22, ciudad: 'San Felipe', capital: true },
			{ id: 457, id_estado: 22, ciudad: 'San Pablo de Yaracuy', capital: false },
			{ id: 458, id_estado: 22, ciudad: 'Urachiche', capital: false },
			{ id: 459, id_estado: 22, ciudad: 'Yaritagua', capital: false },
			{ id: 460, id_estado: 22, ciudad: 'Yumare', capital: false },
			{ id: 461, id_estado: 23, ciudad: 'Bachaquero', capital: false },
			{ id: 462, id_estado: 23, ciudad: 'Bobures', capital: false },
			{ id: 463, id_estado: 23, ciudad: 'Cabimas', capital: false },
			{ id: 464, id_estado: 23, ciudad: 'Campo Concepción', capital: false },
			{ id: 465, id_estado: 23, ciudad: 'Campo Mara', capital: false },
			{ id: 466, id_estado: 23, ciudad: 'Campo Rojo', capital: false },
			{ id: 467, id_estado: 23, ciudad: 'Carrasquero', capital: false },
			{ id: 468, id_estado: 23, ciudad: 'Casigua', capital: false },
			{ id: 469, id_estado: 23, ciudad: 'Chiquinquirá', capital: false },
			{ id: 470, id_estado: 23, ciudad: 'Ciudad Ojeda', capital: false },
			{ id: 471, id_estado: 23, ciudad: 'El Batey', capital: false },
			{ id: 472, id_estado: 23, ciudad: 'El Carmelo', capital: false },
			{ id: 473, id_estado: 23, ciudad: 'El Chivo', capital: false },
			{ id: 474, id_estado: 23, ciudad: 'El Guayabo', capital: false },
			{ id: 475, id_estado: 23, ciudad: 'El Mene', capital: false },
			{ id: 476, id_estado: 23, ciudad: 'El Venado', capital: false },
			{ id: 477, id_estado: 23, ciudad: 'Encontrados', capital: false },
			{ id: 478, id_estado: 23, ciudad: 'Gibraltar', capital: false },
			{ id: 479, id_estado: 23, ciudad: 'Isla de Toas', capital: false },
			{ id: 480, id_estado: 23, ciudad: 'La Concepción del Zulia', capital: false },
			{ id: 481, id_estado: 23, ciudad: 'La Paz', capital: false },
			{ id: 482, id_estado: 23, ciudad: 'La Sierrita', capital: false },
			{ id: 483, id_estado: 23, ciudad: 'Lagunillas del Zulia', capital: false },
			{ id: 484, id_estado: 23, ciudad: 'Las Piedras de Perijá', capital: false },
			{ id: 485, id_estado: 23, ciudad: 'Los Cortijos', capital: false },
			{ id: 486, id_estado: 23, ciudad: 'Machiques', capital: false },
			{ id: 487, id_estado: 23, ciudad: 'Maracaibo', capital: true },
			{ id: 488, id_estado: 23, ciudad: 'Mene Grande', capital: false },
			{ id: 489, id_estado: 23, ciudad: 'Palmarejo', capital: false },
			{ id: 490, id_estado: 23, ciudad: 'Paraguaipoa', capital: false },
			{ id: 491, id_estado: 23, ciudad: 'Potrerito', capital: false },
			{ id: 492, id_estado: 23, ciudad: 'Pueblo Nuevo del Zulia', capital: false },
			{ id: 493, id_estado: 23, ciudad: 'Puertos de Altagracia', capital: false },
			{ id: 494, id_estado: 23, ciudad: 'Punta Gorda', capital: false },
			{ id: 495, id_estado: 23, ciudad: 'Sabaneta de Palma', capital: false },
			{ id: 496, id_estado: 23, ciudad: 'San Francisco', capital: false },
			{ id: 497, id_estado: 23, ciudad: 'San José de Perijá', capital: false },
			{ id: 498, id_estado: 23, ciudad: 'San Rafael del Moján', capital: false },
			{ id: 499, id_estado: 23, ciudad: 'San Timoteo', capital: false },
			{ id: 500, id_estado: 23, ciudad: 'Santa Bárbara Del Zulia', capital: false },
			{ id: 501, id_estado: 23, ciudad: 'Santa Cruz de Mara', capital: false },
			{ id: 502, id_estado: 23, ciudad: 'Santa Cruz del Zulia', capital: false },
			{ id: 503, id_estado: 23, ciudad: 'Santa Rita', capital: false },
			{ id: 504, id_estado: 23, ciudad: 'Sinamaica', capital: false },
			{ id: 505, id_estado: 23, ciudad: 'Tamare', capital: false },
			{ id: 506, id_estado: 23, ciudad: 'Tía Juana', capital: false },
			{ id: 507, id_estado: 23, ciudad: 'Villa del Rosario', capital: false },
			{ id: 508, id_estado: 21, ciudad: 'La Guaira', capital: true },
			{ id: 509, id_estado: 21, ciudad: 'Catia La Mar', capital: false },
			{ id: 510, id_estado: 21, ciudad: 'Macuto', capital: false },
			{ id: 511, id_estado: 21, ciudad: 'Naiguatá', capital: false },
			{ id: 512, id_estado: 25, ciudad: 'Archipiélago Los Monjes', capital: false },
			{ id: 513, id_estado: 25, ciudad: 'Isla La Tortuga y Cayos adyacentes', capital: false },
			{ id: 514, id_estado: 25, ciudad: 'Isla La Sola', capital: false },
			{ id: 515, id_estado: 25, ciudad: 'Islas Los Testigos', capital: false },
			{ id: 516, id_estado: 25, ciudad: 'Islas Los Frailes', capital: false },
			{ id: 517, id_estado: 25, ciudad: 'Isla La Orchila', capital: false },
			{ id: 518, id_estado: 25, ciudad: 'Archipiélago Las Aves', capital: false },
			{ id: 519, id_estado: 25, ciudad: 'Isla de Aves', capital: false },
			{ id: 520, id_estado: 25, ciudad: 'Isla La Blanquilla', capital: false },
			{ id: 521, id_estado: 25, ciudad: 'Isla de Patos', capital: false },
			{ id: 522, id_estado: 25, ciudad: 'Islas Los Hermanos', capital: false },
		]);
	}
};

export default ciudad;
