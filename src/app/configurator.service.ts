import {computed, effect, inject, Injectable, signal, Signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {CarModel, CarOptions, Color, Config} from './models.type';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {

  private http = inject(HttpClient);
  readonly allModels: Signal<CarModel[]> = toSignal(
    this.http.get<CarModel[]>("models"), {initialValue: []}
  );

  //Returns all Colors of Model
  readonly selectableColors = computed(() => this.currentCar()?.colors);
  readonly selectableOptions = signal<CarOptions | null>(null);

  readonly currentColor = signal<Color | undefined>(undefined);
  readonly currentCar = signal<CarModel | undefined>(undefined);
  readonly currentConfig = signal<Config | undefined>(undefined);
  readonly currentWheelIsYoke = signal<boolean>(false);
  readonly currentTowHitchIsSelected = signal<boolean>(false);

  //Returns current Image of Car
  readonly currentImage = computed(
    () => {
      const car = this.currentCar();
      const color = this.currentColor();
      if (car && color)
        return `https://interstate21.com/tesla-app/images/${car.code}/${color.code}.jpg`
      else return null;
    }
  );

  /*
  * Checks if Car and Color are set
  * returns a Booelan
  *
  * */
  readonly step2Ready:
    Signal<boolean> = computed(() => this.currentCar() != undefined && this.currentColor() != undefined);

  //Returns all Options of a car
  constructor() {
    effect(() => {
      if (this.currentCar()?.code)
        this.http.get<CarOptions>("options/" + this.currentCar()?.code)
          .subscribe(options => this.selectableOptions.set(options))
    });
  }

  /*
  * Selects the Model
  * Sets Model, Color and Options
  *
  * */
  selectModel(code: CarModel["code"]) {
    const model = this.allModels().find(model => model.code === code);
    this.currentCar.set(model);
    this.currentColor.set(model?.colors[0]);
    this.currentWheelIsYoke.set(false);
    this.currentTowHitchIsSelected.set(false);
    this.currentConfig.set(undefined);
  }

  //Sets Color
  selectColor(code: Color["code"]) {
    const color = this.selectableColors()?.find(color => color.code === code);
    this.currentColor.set(color);
  }

  //Sets Config
  selectConfig(id: string) {
    const config = this.selectableOptions()?.configs.find(config => config.id === +id);
    this.currentConfig.set(config);
  }
}
