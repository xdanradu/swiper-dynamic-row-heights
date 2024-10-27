import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SwiperComponent } from 'swiper/angular';

// import Swiper core and required components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper';
import { BehaviorSubject } from 'rxjs';
import Swiper from 'swiper/types/swiper-class';
import { CompareService } from './service';

// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
]);

@Component({
  selector: 'app-swiper-example',
  styles: [
    `
      .bg-yellow {
        background-color: yellow;
      }
      .transition {
        transition: background 0.25s ease, color 0.25s ease;
      }
      .active-slide {
        background-color: green;
        color: #fff;
      }
      .bg-blue {
        background-color: blue;
        color: #fff;
      }
    `,
  ],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;
  @ViewChild('container', { static: false }) container: ElementRef;

  products = [
    {
      id: 1,
      name: 'iPhone 11',
      description: 'Description 11',
      price: 1000,
      features:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 2,
      name: 'iPhone 12',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      price: 10,
      features: '-',
    },
    {
      id: 3,
      name: 'iPhone 13',
      description: '-',
      price: 1000,
      features:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    },
    {
      id: 4,
      name: '-',
      description: '-',
      price: 1,
      features: 'uis aute irure dolor in reprehenderit',
    },
  ];

  show: boolean;
  thumbs: any;
  slides$ = new BehaviorSubject<string[]>(['']);
  constructor(
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
    private containerService: CompareService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  getSlides() {
    this.slides$.next(
      Array.from({ length: 600 }).map((el, index) => `Slide ${index + 1}`)
    );
  }

  thumbsSwiper: any;
  setThumbsSwiper(swiper) {
    this.thumbsSwiper = swiper;
  }
  controlledSwiper: any;
  setControlledSwiper(swiper) {
    this.controlledSwiper = swiper;
  }

  indexNumber = 1;
  exampleConfig = { slidesPerView: 3 };
  slidesPerView: number = 4;
  pagination: any = false;

  slides2 = ['slide 1', 'slide 2', 'slide 3'];
  replaceSlides() {
    this.slides2 = ['foo', 'bar'];
  }

  togglePagination() {
    if (!this.pagination) {
      this.pagination = { type: 'fraction' };
    } else {
      this.pagination = false;
    }
  }

  navigation = false;
  toggleNavigation() {
    this.navigation = !this.navigation;
  }

  scrollbar: any = false;
  toggleScrollbar() {
    if (!this.scrollbar) {
      this.scrollbar = { draggable: true };
    } else {
      this.scrollbar = false;
    }
  }
  breakpoints = {
    640: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 4, spaceBetween: 40 },
    1024: { slidesPerView: 4, spaceBetween: 50 },
  };

  slides = Array.from({ length: 5 }).map((el, index) => `Slide ${index + 1}`);
  virtualSlides = Array.from({ length: 600 }).map(
    (el, index) => `Slide ${index + 1}`
  );

  log(log: string) {
    // console.log(string);
  }

  breakPointsToggle: boolean;
  breakpointChange() {
    this.breakPointsToggle = !this.breakPointsToggle;
    this.breakpoints = {
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 4, spaceBetween: 40 },
      1024: { slidesPerView: this.breakPointsToggle ? 7 : 5, spaceBetween: 50 },
    };
  }

  slidesEx = ['first', 'second'];

  onSlideChange(swiper: any) {
    if (swiper.isEnd) {
      // all swiper events are run outside of ngzone, so use ngzone.run or detectChanges to update the view.
      this.ngZone.run(() => {
        this.slidesEx = [...this.slidesEx, `added ${this.slidesEx.length - 1}`];
      });
      console.log(this.slidesEx);
    }
  }

  ngAfterViewInit() {
    // this.renderer.setStyle(this.container.nativeElement, 'opacity', `0`);

    let cards = this.container.nativeElement.querySelectorAll('.swiper-slide');
    let heights = this.containerService.getMaxHeights(cards);
    for (let i = 0; i < cards.length; i++) {
      // this.renderer.setStyle(cards[i], 'opacity', `0`);
      this.setHeights(cards[i], heights);
      // setTimeout(()=>this.renderer.setStyle(cards[i], 'opacity', `1`), 0);
    }

    setTimeout(() => {
      this.renderer.setStyle(this.container.nativeElement, 'opacity', `1`);
    }, 500);
  }

  setHeights(card: any, heights: any) {
    let rows = card.querySelectorAll('.row');

    for (let i = 0; i < rows.length; i++) {
      this.renderer.setStyle(rows[i], 'height', `${heights[i]}px`);
    }
  }
}
