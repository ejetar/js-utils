const type = tipo => tipo === 'physical' || tipo === 'legal';

const cnpj = (cnpj) => {
	if(!cnpj)
		return false;

	cnpj = cnpj.replace(/\D/g,'');

	if (cnpj.length != 14 || cnpj == "00000000000000")
		return false;

	// Valida DVs
	var tamanho = cnpj.length - 2
	var numeros = cnpj.substring(0,tamanho);
	var digitos = cnpj.substring(tamanho);
	var soma = 0;
	var pos = tamanho - 7;
	for (let i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2)
			pos = 9;
	}
	var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	if (resultado != digitos.charAt(0))
		return false;

	tamanho = tamanho + 1;
	numeros = cnpj.substring(0,tamanho);
	soma = 0;
	pos = tamanho - 7;
	for (let i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2)
			pos = 9;
	}
	resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	if (resultado != digitos.charAt(1))
		return false;

	return true;
};

const cpf = (cpf) => {
	if (!cpf)
		return false;

	cpf = cpf.replace(/\D/g,'');

	var Soma;
	var Resto;

	Soma = 0;
	if (cpf.length != 11 || cpf == "00000000000")
		return false;

	for (let i=1; i<=9; i++)
		Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);

	Resto = (Soma * 10) % 11;

	if ((Resto == 10) || (Resto == 11))
		Resto = 0;

	if (Resto != parseInt(cpf.substring(9, 10)) )
		return false;

	Soma = 0;
	for (let i = 1; i <= 10; i++)
		Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);

	Resto = (Soma * 10) % 11;

	if ((Resto == 10) || (Resto == 11))
		Resto = 0;

	if (Resto != parseInt(cpf.substring(10, 11) ) )
		return false;

	return true;
};

const phone = (phone) =>
	//mobile || landline
	/\(\d{2}\)\s\d{5}-\d{4}/.test(phone) || /\(\d{2}\)\s\d{4}-\d{4}/.test(phone);

const cep = (cep) => /\d{5}-\d{3}/.test(cep);

//Without validation. Always returns true.
const no = () => true;

export {
	type,
	cnpj,
	cpf,
	phone,
	cep,
	no
};
