import { useRouter } from "next/router";
import { ROUTES } from "@/shared/constants/routes";
import { Language } from "@/shared/enum/general";

const useNavigationService = () => {
	const router = useRouter();
	const { pathname, query, locale } = router;

	const currentPath = pathname;

	const refreshPage = () => router.reload();

	const navigateTo = (route: string) => {
		router.push({ pathname: route, query }, undefined, {
			locale,
		});
	};

	const navigateToHomepage = () => {
		router.push({ pathname: ROUTES.HOMEPAGE, query }, undefined, {
			locale,
		});
	};

	const navigateToAccount = () => {
		router.push({ pathname: ROUTES.ACCOUNT, query }, undefined, {
			locale,
		});
	};

	const navigateToLogin = () => {
		router.push({ pathname: ROUTES.LOGIN, query }, undefined, {
			locale,
		});
	};

	const navigateToRegister = () => {
		router.push({ pathname: ROUTES.REGISTER, query }, undefined, {
			locale,
		});
	};

	const navigateToBuilder = () => {
		router.push({ pathname: ROUTES.BUILDER, query }, undefined, {
			locale,
		});
	};

	const changeLocale = (newLocale: Language) => {
		router.push({ pathname, query }, undefined, {
			locale: newLocale,
		});
	};

	return {
		currentPath,
		refreshPage,
		navigateTo,
		navigateToHomepage,
		navigateToAccount,
		navigateToLogin,
		navigateToRegister,
		navigateToBuilder,
		changeLocale,
	};
};
export default useNavigationService;
