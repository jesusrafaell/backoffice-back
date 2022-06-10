import { Terminal, TerminalPagina } from 'interfaces/general';

export const formatTerminals = (terminals: any[]) => {
	let list: any = [];
	for (let i = 0; i < terminals.length; i++) {
		list.push({
			terminalId: terminals[i]!.id,
		});
	}
	return list;
};
