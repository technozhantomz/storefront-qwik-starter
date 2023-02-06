import {
	$,
	component$,
	Slot,
	useClientEffect$,
	useContextProvider,
	useOn,
	useStore,
	useTask$,
} from '@builder.io/qwik';
import { isBrowser, isServer } from '@builder.io/qwik/build';
import { APP_STATE, CUSTOMER_NOT_DEFINED_ID } from '~/constants';
import {
	getActiveOrderQuery,
	getAvailableCountriesQuery,
	getCollectionsQuery,
} from '~/graphql/queries';
import { ActiveCustomer, ActiveOrder, AppState, Collection, Country } from '~/types';
import { execute } from '~/utils/api';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';

export default component$(() => {
	const state = useStore<AppState>({
		collections: [],
		activeOrder: {} as ActiveOrder,
		showCart: false,
		customer: { id: CUSTOMER_NOT_DEFINED_ID, firstName: '', lastName: '' } as ActiveCustomer,
		shippingAddress: {
			city: '',
			company: '',
			countryCode: '',
			fullName: '',
			phoneNumber: '',
			postalCode: '',
			province: '',
			streetLine1: '',
			streetLine2: '',
		},
		availableCountries: [],
	});
	useContextProvider(APP_STATE, state);

	useTask$(async () => {
		if (isServer) {
			const { collections } = await execute<{
				collections: { items: Collection[] };
			}>(getCollectionsQuery());
			state.collections = collections.items.filter((item) => item.name !== 'Pet Food');
			const { availableCountries } = await execute<{ availableCountries: Country[] }>(
				getAvailableCountriesQuery()
			);
			state.availableCountries = availableCountries;
			state.shippingAddress.countryCode = availableCountries[0].code;
		}
	});

	// with useTask$ doesn't have the same behaviour
	useClientEffect$(async () => {
		if (isBrowser) {
			window.scrollTo(0, 0);
			const { activeOrder } = await execute<{ activeOrder: ActiveOrder }>(getActiveOrderQuery());
			state.activeOrder = activeOrder;
		}
	});

	useOn(
		'keydown',
		$((event: unknown) => {
			if ((event as KeyboardEvent).key === 'Escape') {
				state.showCart = false;
			}
		})
	);

	return (
		<div>
			<Header />
			<main>
				<Slot />
			</main>
			<Footer />
		</div>
	);
});
