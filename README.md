# Prática Holidayzer

Nesta prática iremos desenvolver um back-end de calendário de feriados! A ideia é termos a lista dos feriados e também saber se hoje é um feriado 😎 ou não 😢

- Array de feriados (formato: mês/dia/ano)
```javascript
	const holidays = [
		{ date: "1/1/2023", name: "Confraternização mundial" },
		{ date: "2/2/2023", name: "Carnaval" },
		{ date: "4/7/2023", name: "Sexta-feira Santa" },
		{ date: "4/9/2023", name: "Páscoa" },
		{ date: "4/21/2023", name: "Tiradentes" },
		{ date: "5/1/2023", name: "Dia do trabalho" },
		{ date: "6/8/2023", name: "Corpus Christi" },
		{ date: "9/7/2023", name: "Independência do Brasil" },
		{ date: "10/12/2023", name: "Nossa Senhora Aparecida" },
		{ date: "11/2/2023", name: "Finados" },
		{ date: "11/15/2023", name: "Proclamação da República" },
		{ date: "12/25/2023", name: "Natal" }
	];
```

### Back-End
Você deve rodar o seu app servidor na porta 5005 para que os testes do HUB CLI funcionem.

1. **GET** `/holidays`

- Deve retornar a lista completa de feriados.

2. **GET** `/is-today-holiday`

- Deve retornar um objeto com uma chave chamada `message` com a seguinte informação: “Sim, hoje é nome-do-feriado” para quando o dia de hoje for feriado; caso contrário, deve retornar a seguinte `message`: “Não, hoje não é feriado”. Veja o exemplo:

```javascript
{
	message: "Não, hoje não é ferido"
}
```

- Dica: Você pode usar o Objeto Date do JS para gerar a data e formatá-la com `toLocaleDateString()` para obter o dia de hoje no mesmo formato das datas do array. Exemplo:

```javascript
	const hoje = new Date();
	console.log(hoje.toLocaleDateString("en-us")); // 12/25/2023
```
