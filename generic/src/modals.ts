import * as userSettings from "./storage";
import * as binding from "./binding";
import {
    recalculateEligibleCountries,
    invalidateCounter,
    getAndShowNextFlag,
    resetNumQuestionAnswered,
} from "./scripts";

export function showSettings() {
    binding.modeSetting.value = userSettings.getMode();
    binding.flagSetSetting.value = userSettings.getFlagSetString();
    binding.reshowSetting.checked = userSettings.getShouldReshowUnknown();
    document.getElementById("settings-section")!.style.display = "revert";
}

export function hideSettings() {
    document.getElementById("settings-section")!.style.display = "none";

    const mode = binding.modeSetting.value;
    const flagSet = binding.flagSetSetting.value;
    const shouldReshowUnknown = binding.reshowSetting.checked;

    if (userSettings.getMode() != mode || userSettings.getFlagSetString() != flagSet) {
        localStorage.setItem("mode", mode);
        localStorage.setItem("flag-set", flagSet);

        resetNumQuestionAnswered();
        recalculateEligibleCountries();
        invalidateCounter();
        getAndShowNextFlag();
    }

    localStorage.setItem("shouldReshowUnknown", shouldReshowUnknown.toString());
}
