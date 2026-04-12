import { SvelteStore, Prop, Derived } from 'sveltejs-typestore';
import type { GameLocation } from '@/stores/presets.store';

export const DEFAULT_LOCATIONS: GameLocation[] = [
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
];

export enum VoteMode {
	ANYTIME = 'ANYTIME',
	END = 'END',
}

export class Player {
	/** null = spy, string = civilian role from location */
	public role: string | null;
	public time: number;
	public eliminated: boolean;
}

export class LobbyStore extends SvelteStore {
	@Prop({ default: Object.assign({}, ...Array.from(new Array(4), (_, i) => ({ [i]: {} }))) })
	public players: Record<string, Partial<Player>>;

	@Prop({ default: 1 })
	public spies: number;

	@Prop({ default: 60 })
	public duration: number;

	@Prop({ default: VoteMode.ANYTIME })
	public vote: VoteMode;

	@Prop({ default: true })
	public blindSpies: boolean;

	@Prop({ default: false })
	public paused: boolean;

	@Prop({ default: DEFAULT_LOCATIONS[1] })
	public location: GameLocation;

	@Derived()
	public playerCount() {
		return Object.keys(this.players).length;
	}

	public removePlayer(name: string) {
		this.update((s) => {
			const { [name]: _, ...rest } = s.players;
			return { ...s, players: rest };
		});
	}

	@Derived()
	public getRandomRoles() {
		const { roles } = this.location;
		const total = Object.keys(this.players).length;

		return [
			...Array(this.spies).fill(null),
			...Array.from({ length: total - this.spies }, (_, i) => roles[i % roles.length]),
		].sort(() => Math.random() - 0.5);
	}
}

export const lobby = new LobbyStore();
