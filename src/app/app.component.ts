import { Component, OnInit } from "@angular/core";

import axios from "axios";
import { debounce } from "lodash";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "my-app";

  public page = 1;
  public images = [];
  public nextImages = [];
  public previousImages = [];
  public selectedImage;
  public limit = 30;
  public loadImagesWithNewLimit = debounce(async (event) => {
    this.limit = event.target.value;
    this.images = await this.getImages(this.page, this.limit);
    this.nextImages = await this.getImages(this.page + 1, this.limit);
    this.previousImages = await this.getImages(this.page - 1, this.limit);
    this.preloadImages(this.nextImages);
  }, 250);

  async ngOnInit() {
    this.images = await this.getImages();
    this.nextImages = await this.getImages(this.page + 1);
    this.previousImages = await this.getImages(this.page - 1);
    this.preloadImages(this.nextImages);
  }

  public async getImages(page = 1, limit = 30) {
    if (page <= 0) {
      return [];
    }

    const imageResponse = await axios.get(
      `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
    );

    const data = imageResponse.data.map(image => {
      const { author, download_url, id, url } = image;
      const regexPattern = `.*id/${id}/`;
      const baseUrl = download_url.match(regexPattern);
      const aspectRatio = "367/267";
      const src = `${baseUrl}${aspectRatio}`;
      const originalSrc = download_url;

      return {
        src,
        originalSrc,
        url,
        author,
        id
      };
    });

    return data;
  }

  public preloadImages = (images) => {
    images.forEach(image => {
      const img = new Image();
      img.src = image.src;
    });
  };

  public onPreviousClick = async () => {
    this.page--;
    this.nextImages = this.images;
    this.images = this.previousImages;
    this.previousImages = await this.getImages(this.page - 1, this.limit);
  }

  public onNextClick = async () => {
    this.page++;
    this.previousImages = this.images;
    this.images = this.nextImages;
    this.nextImages = await this.getImages(this.page + 1, this.limit);
    this.preloadImages(this.nextImages);
  };

  public onChange = (event) => {
    this.loadImagesWithNewLimit(event);
  }

  public selectImage = (image) => {
    this.selectedImage = image.originalSrc;
  }

  public deselectImage = () => {
    this.selectedImage = undefined;
  }
}
