import { jest, expect } from '@jest/globals'

import { exec } from "child_process";
import request from "./utils/request";

jest.setTimeout(15000);

const sleep = timeout => new Promise(resolve => setTimeout(() => resolve(), timeout));

class ServerData {
	constructor() {
		this._process = null;
		this._lastCommand = null;
	}

	get process() {
		return this._process;
	}

	async setProcess(newValueSetter) {
		if (this._process !== null) {
			exec(`kill -9 ${this._process.pid}`);
			exec(`kill -9 ${this._process.pid + 1}`);
			await sleep(2500);
		}

		await (2500);
		this._process = newValueSetter();
	}
}

const server = new ServerData();

afterAll(() => {
	server.setProcess(() => null);
});

async function _setup() {
	await server.setProcess(() => exec('node src/app'));
	server.process.stdout.on('data', chunk => console.log(chunk.toString()));
	server.process.stderr.on('data', chunk => console.log(chunk.toString()));
	await sleep(2000);
}

describe("GET /holidays", () => {
	it("should respond with an array of holidays", async () => {

		await _setup();

		const res = await request.get("/holidays");

		expect(res.data.length).toBe(12)
	});

	it("should respond with a series of holidays in the correct format with date and name", async () => {

		await _setup();

		const res = await request.get("/holidays");

		for (const holiday of res.data) {
			expect(holiday).toEqual({
				date: expect.any(String),
				name: expect.any(String)
			});
		}
	});
});

describe("GET /is-today-holiday", () => {
	it("should answer that today is not a holiday", async () => {
		await _setup();
		const res = await request.get("/is-today-holiday");

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
		]

		const today = (new Date()).toLocaleDateString("en-us")

		const isHoliday = holidays.find((h) => h.date === today)

		if (isHoliday) {
			expect(res.data).toEqual({
				message: `Sim, hoje é ${isHoliday.name}`
			})
		} else {
			expect(res.data).toEqual({
				message: "Não, hoje não é feriado"
			})
		}
	});
});
