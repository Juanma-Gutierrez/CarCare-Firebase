import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'firebase/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User, VehiclePreview } from 'src/app/core/interfaces/User';
import { FirebaseService } from 'src/app/core/services/api/firebase/FirebaseService';
import { USER } from 'src/app/core/services/const.service';
import { CustomTranslateService } from 'src/app/core/services/custom-translate.service';

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
    ) {
        this.users$.subscribe(_data => {
            this.data1 = dataMappingSvc(_data, "brand");
            this.data2 = dataMappingSvc(_data, "category");
            this.data3 = dataMappingSvc(_data, "available");
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

function dataMappingSvc(usersList: User[], segmentation: string): any {
    var dataset: VehiclePreview[] = [];
    usersList.forEach(user => {
        user.vehicles.forEach(vehicle => {
            dataset.push(vehicle);
        });
    })
    var datamap = dataset.map(d => {
        console.log(d)
        return {
            available: d.available,
            brand: d.brand,
            category: d.category,
        }
    })
    const objectByCategories = countCategories(datamap);
    var title;
    var label;
    var data;
    switch (segmentation) {
        case ("available"): {
            title = "Unidades disponibles";
            label = Object.keys(objectByCategories.available);
            data = Object.values(objectByCategories.available);
            console.log(data)
            break;
        };
        case ("brand"): {
            title = "Por marca";
            label = Object.keys(objectByCategories.brand);
            data = Object.values(objectByCategories.brand);
            break;
        };
        case ("category"): {
            title = "Por categoría";
            label = Object.keys(objectByCategories.category);
            data = Object.values(objectByCategories.category);
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