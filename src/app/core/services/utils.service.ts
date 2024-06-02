import { Injectable } from '@angular/core';
import { Dialog } from '@capacitor/dialog';
import { Preferences } from '@capacitor/preferences';
import { Share } from '@capacitor/share';
import { ToastController, ToastOptions } from '@ionic/angular';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { VehiclePreview } from '../interfaces/User';
import { Position } from './const.service';
import { CustomTranslateService } from './custom-translate.service';


/**
 * Generates a random alphanumeric ID.
 * @returns {string} - The generated ID.
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Saves the user's name to the LocalStorage.
 * @param {string} user - The user's name to be saved.
 */
export function saveLocalStorageUser(user: string) {
    console.info(`Saved to LocalStorage: ${user}`);
    Preferences.set({
        key: 'userName',
        value: user
    });
}

export function convertDateToLongIsoFormatDate(date: any): string {
    let stringDate = date.toString()
    let formattedDate = stringDate.substring(0, 19) + ".000Z"
    return formattedDate
}

/**
 * Loads the user's name from the LocalStorage.
 * @returns {Promise<string>} - A promise that resolves to the user's name retrieved from the LocalStorage.
 */
export function loadLocalStorageUser(): Promise<string> {
    return Preferences.get({ key: 'userName' }).then((ret: any) => {
        return ret.value;
    }).catch();
}

/**
 * Capitalizes the first letter of a word.
 * @param {string} word - The word to capitalize.
 * @returns {string} - The word with the first letter capitalized.
 */
export function capitalizeFirstLetter(word: string): string {
    if (word.length === 0) {
        return word;
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Service for utility functions.
 * @param {ToastController} toast - The ToastController for displaying toast messages.
 * @param {CustomTranslateService} translateSvc - The translation service for translating messages.
 */
@Injectable({
    providedIn: 'root'
})
export class UtilsService {


    /**
     * Constructs a new UtilsService.
     * @param {ToastController} toast - The ToastController for displaying toast messages.
     * @param {CustomTranslateService} translateSvc - The translation service for translating messages.
     */
    constructor(
        private toast: ToastController,
        private translateSvc: CustomTranslateService,
    ) { }

    /**
     * Displays a toast message.
     * @param {string} message - The message to be displayed.
     * @param {string} color - The color of the toast message.
     * @param {Position["TOP"] | Position["BOTTOM"]} position - The position of the toast message.
     * @param {number} duration - The duration of the toast message display (default is 2000 milliseconds).
     */
    public async showToast(message: string, color: string, position: Position["TOP"] | Position["BOTTOM"], duration: number = 2000) {
        var messageToShow = this.translateSvc.getValue(message);
        console.info("Show toast: " + messageToShow);
        if (messageToShow != null) {
            const options: ToastOptions = {
                message: messageToShow,
                duration: duration,
                position: position,
                color: color,
            };
            const toast = await this.toast.create(options);
            toast.present();
        }
    }

    /**
     * Displays a confirmation dialog.
     * @param {string} message - The message to be displayed in the confirmation dialog.
     * @returns {Promise<boolean>} - A promise that resolves to true if the confirmation is accepted, false otherwise.
     */
    async showConfirm(message: string): Promise<boolean> {
        var messageToShow = this.translateSvc.getValue(message);
        const { value } = await Dialog.confirm({
            title: this.translateSvc.getValue("message.confirm.title"),
            message: messageToShow,
            okButtonTitle: this.translateSvc.getValue("message.confirm.okButton"),
            cancelButtonTitle: this.translateSvc.getValue("message.confirm.cancelButton")
        });
        return value;
    }

    /**
     * Shares a list of vehicle previews.
     * @param {VehiclePreview[]} vehiclesList - The list of vehicle previews to be shared.
     */
    async shareVehicles(vehiclesList: VehiclePreview[]) {
        var textToShare = this.translateSvc.getValue("vehicles.vehiclesList") + "\n\n";
        for (var vehicle of vehiclesList) {
            var available = vehicle.available ? "✅" : "❌";
            textToShare += `- ${available} ${vehicle.plate.toUpperCase()}: ${capitalizeFirstLetter(vehicle.brand)} ${capitalizeFirstLetter(vehicle.model)}\n`;
        }
        await Share.share({
            text: textToShare,
        });
    }

    async getURLFromVehicle(vehicle: VehiclePreview): Promise<string> {
        const storage = getStorage();
        if (vehicle.imageURL) {
            try {
                const url = await getDownloadURL(ref(storage, vehicle.imageURL));
                return url;
            } catch (error) {
                return this.getPlaceholderCategory(vehicle);
            }
        } else {
            return this.getPlaceholderCategory(vehicle);
        }
    }

    getPlaceholderCategory(vehicle: VehiclePreview): string {
        switch (vehicle.category) {
            case "car": return "assets/placeholder/placeholder_car.png";
            case "motorcycle": return "assets/placeholder/placeholder_motorcycle.png";
            case "van": return "assets/placeholder/placeholder_van.png";
            case "truck": return "assets/placeholder/placeholder_truck.png";
            default: return "assets/placeholder/placeholder_car.png";
        }
    }
}
