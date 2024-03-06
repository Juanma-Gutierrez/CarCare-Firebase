import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'firebase/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User, VehiclePreview } from 'src/app/core/interfaces/User';
import { FirebaseService } from 'src/app/core/services/api/firebase/FirebaseService';
import { USER } from 'src/app/core/services/const.service';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';
import { capitalizeFirstLetter } from 'src/app/core/services/utils.service';

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

    constructor(
        private firebaseSvc: FirebaseService,
        private translateSvc: CustomTranslateService,
    ) {
        this.users$.subscribe(_data => {
            this.data1 = dataMappingSvc(_data, "brand", translateSvc);
            this.data2 = dataMappingSvc(_data, "category", translateSvc);
            this.data3 = dataMappingSvc(_data, "available", translateSvc);
        });
        this.options = {
            responsive: true,
            maintainAspectRatio: false,
        };
    }

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

    ngOnDestroy(): void {
        this.unsubscribes.forEach(uns => { if (uns) uns() });
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}

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