import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'firebase/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ItemLog } from 'src/app/core/interfaces/ItemLog';
import { User, VehiclePreview } from 'src/app/core/interfaces/User';
import { FirebaseService } from 'src/app/core/services/api/firebase/FirebaseService';
import { Mapping } from 'src/app/core/services/api/firebase/mapping';
import { LocalDataService } from 'src/app/core/services/api/local-data.service';
import { LOG, USER } from 'src/app/core/services/const.service';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';
import { capitalizeFirstLetter } from 'src/app/core/services/utils.service';

/**
 * Page component for the admin dashboard.
 */
@Component({
    selector: 'app-admin',
    templateUrl: './admin.page.html',
    styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit, OnDestroy {
    private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    public users$: Observable<User[]> = this._users.asObservable();
    private unsubscribes: (Unsubscribe | null)[] = [];
    private subscriptions: Subscription[] = [];
    data1: any;
    data2: any;
    data3: any;
    options: any;
    horizontalOptions: any;

    /**
     * Constructs a new AdminPage component.
     * @param {FirebaseService} firebaseSvc - The service for Firebase operations.
     * @param {CustomTranslateService} translateSvc - The translation service for translating messages.
     */
    constructor(
        private firebaseSvc: FirebaseService,
        private translateSvc: CustomTranslateService,
        private localDataSvc: LocalDataService,
    ) {
        this.users$.subscribe(_data => {
            this.data1 = dataMappingSvc(_data, "brand", translateSvc);
            this.data2 = dataMappingSvc(_data.sort((a, b) => a.name.localeCompare(b.name)), "category", translateSvc);
            this.data3 = dataMappingSvc(_data, "available", translateSvc);
        });
        this.options = {
            responsive: true,
            maintainAspectRatio: false,
        };
        this.horizontalOptions = {
            indexAxis: 'y',
        };
    }

    /**
     * Initializes the AdminPage component.
     */
    ngOnInit() {
        this.unsubscribes.push(this.firebaseSvc.subscribeToCollection(USER, this._users, (data) => {
            const userData = data['data']();
            const user = {
                email: userData.email,
                name: userData.name,
                nickname: userData.nickname,
                role: userData.role,
                surname: userData.surname,
                vehicles: userData.vehicles,
            }
            return user;
        }));
        this.subscriptions.push(this.users$.subscribe());
    }

    /**
     * Performs cleanup operations when the AdminPage component is destroyed.
     */
    ngOnDestroy(): void {
        this.unsubscribes.forEach(uns => { if (uns) uns() });
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    /**
     * Callback function for export button click event.
     * Retrieves logs data from Firebase and generates a CSV file.
     */
    onExportClicked() {
        const mapping = new Mapping(this.localDataSvc)
        this.firebaseSvc.getDocument(LOG.COLLECTION, LOG.DOCUMENT).then(log => {
            const data: ItemLog[] = log.data['logs'];
            const formattedData = mapping.mapArrayItemLogToCSVData(data);
            const csvRaw = convertArrayToCSV(formattedData);
            generateCSV(csvRaw);
        }
        )
    }
}

/**
 * Converts an array of objects to a CSV string.
 * @param {ItemLog[]} data - The array of objects to be converted.
 * @returns {string} - The CSV string.
 */
function convertArrayToCSV(data: ItemLog[]): string {
    const headers = ['uid', 'content', 'operationLog', 'dateTime', 'currentUser', 'type'];
    const csvRows = [];
    csvRows.push(headers.join(','));
    for (const row of data) {
        const values = headers.map(header => {
            const value = row[header as keyof ItemLog] || '';
            const escapedValue = ('' + value).replace(/"/g, '""');
            return `"${escapedValue}"`;
        });
        csvRows.push(values.join(','));
    }
    return csvRows.join('\n');
}

/**
 * Maps data for chart visualization based on user and vehicle information.
 * @param {User[]} usersList - The list of users.
 * @param {string} segmentation - The segmentation criteria for mapping the data.
 * @param {CustomTranslateService} translateSvc - The translation service for translating messages.
 * @returns {any} - The mapped data for chart visualization.
 */
function dataMappingSvc(usersList: User[], segmentation: string, translateSvc: CustomTranslateService): any {
    var dataset: VehiclePreview[] = [];
    usersList.forEach(user => {
        user.vehicles.forEach(vehicle => {
            dataset.push(vehicle);
        });
    })
    var datamap = dataset.map(d => {
        return {
            available: d.available,
            brand: capitalizeFirstLetter(d.brand),
            category: translateSvc.getValue("charts.vehicleCategory." + d.category),
        }
    })
    const objectByCategories = countCategories(datamap);
    var title;
    var label;
    var data;
    switch (segmentation) {
        case ("brand"): {
            title = translateSvc.getValue("charts.titles.title1");
            label = Object.keys(objectByCategories.brand);
            data = Object.values(objectByCategories.brand);
            break;
        };
        case ("category"): {
            title = translateSvc.getValue("charts.titles.title2");
            label = Object.keys(objectByCategories.category);
            data = Object.values(objectByCategories.category);
            break;
        };
        case ("available"): {
            title = translateSvc.getValue("charts.titles.title3");
            label = Object.keys(objectByCategories.available);
            data = Object.values(objectByCategories.available);
            break;
        };
    }
    return {
        labels: label,
        datasets: [
            {
                label: title,
                data: data,
                fill: false,
                borderWidth: 1
            }
        ]
    };
}

/**
 * Counts the occurrences of categories in the provided data.
 * @param {any[]} data - The data to be counted.
 * @returns {any} - An object containing counts of available, not available, category, and brand.
 */
function countCategories(data: any[]): any {
    const availableCounts: Record<string, number> = {};
    const notAvailableCounts: Record<string, number> = {};
    const brandCounts: Record<string, number> = {};
    const categoryCounts: Record<string, number> = {};
    data.forEach(item => {
        availableCounts[item.category] = (availableCounts[item.category] || 0) + (item.available ? 1 : 0);
        notAvailableCounts[item.category] = (availableCounts[item.category] || 0) + (item.available ? 0 : 1);
        categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
        brandCounts[item.brand] = (brandCounts[item.brand] || 0) + 1;
    });
    return {
        available: availableCounts,
        notAvailable: notAvailableCounts,
        category: categoryCounts,
        brand: brandCounts
    };
}

/**
 * Generates and initiates the download of a CSV file with the provided data.
 * @param {string} csvRaw - The raw CSV data to be downloaded.
 * @param {string} [filename='logs.csv'] - The filename for the downloaded CSV file.
 */
function generateCSV(csvRaw: string, filename: string = 'logs.csv') {
    const blob = new Blob([csvRaw], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
