import { SvelteStore, Prop, Derived } from 'sveltejs-typestore';

export class GameLocation {
	public name: string;
	public roles: string[];
}

export interface Preset {
	id: string;
	name: string;
	locations: GameLocation[];
}

export const PRESETS: Preset[] = [
	{
		id: 'classic',
		name: 'Класичний',
		locations: [
			{ name: 'Аеропорт', roles: ['Пілот', 'Стюардеса', 'Пасажир', 'Митник', 'Механік'] },
			{ name: 'Банк', roles: ['Касир', 'Охоронець', 'Клієнт', 'Менеджер'] },
			{ name: 'Казино', roles: ['Дилер', 'Гравець', 'Бармен', 'Охоронець'] },
			{ name: 'Лікарня', roles: ['Лікар', 'Медсестра', 'Пацієнт', 'Хірург'] },
			{ name: 'Пляж', roles: ['Рятувальник', 'Турист', 'Серфер', 'Продавець'] },
			{ name: 'Посольство', roles: ['Дипломат', 'Консул', 'Охоронець', 'Відвідувач'] },
			{ name: 'Ресторан', roles: ['Шеф-кухар', 'Офіціант', 'Клієнт', 'Власник'] },
			{ name: 'Університет', roles: ['Студент', 'Декан', 'Викладач', 'Лаборант'] },
			{ name: 'Цирк', roles: ['Клоун', 'Акробат', 'Дресирувальник', 'Глядач'] },
			{ name: 'Яхта', roles: ['Капітан', 'Матрос', 'Пасажир', 'Кухар'] },
		],
	},
	{
		id: 'fantasy',
		name: 'Фентезі',
		locations: [
			{ name: 'Таверна', roles: ['Бармен', 'Мандрівник', 'Бард', 'Охоронець'] },
			{ name: 'Замок', roles: ['Король', 'Лицар', 'Слуга', 'Маг'] },
			{ name: 'Гільдія магів', roles: ['Архімаг', 'Учень', 'Торговець', 'Стражник'] },
			{ name: 'Підземелля', roles: ['Герой', 'Злодій', 'Клірик', 'Варвар'] },
			{ name: 'Ринок', roles: ['Купець', 'Злодій', 'Стражник', 'Покупець'] },
			{ name: 'Ліс', roles: ['Ельф', 'Мисливець', 'Друїд', 'Рейнджер'] },
		],
	},
	{
		id: 'space',
		name: 'Космос',
		locations: [
			{ name: 'Станція', roles: ['Командир', 'Інженер', 'Вчений', 'Медик'] },
			{ name: 'Корабель', roles: ['Капітан', 'Пілот', 'Механік', 'Стрілець'] },
			{ name: 'База на Марсі', roles: ['Геолог', 'Медик', 'Охоронець', 'Колоніст'] },
			{ name: 'Чорна діра', roles: ['Фізик', 'Астронавт', 'ШІ', 'Спостерігач'] },
			{ name: 'Колонія', roles: ['Губернатор', 'Фермер', 'Солдат', 'Технік'] },
		],
	},
];

export class PresetsStore extends SvelteStore {
	@Prop({ default: ['classic'] })
	public selected: string[];

	@Derived()
	public locations(): GameLocation[] {
		return PRESETS.filter((p) => this.selected.includes(p.id)).flatMap((p) => p.locations);
	}

	public toggle(id: string) {
		this.update((s) => ({
			...s,
			selected: s.selected.includes(id) ? s.selected.filter((x) => x !== id) : [...s.selected, id],
		}));
	}

	@Derived()
	public randomLocation(): GameLocation {
		const locs = this.locations();
		return locs[Math.floor(Math.random() * locs.length)];
	}
}

export const presets = new PresetsStore();
