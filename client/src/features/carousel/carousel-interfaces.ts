export interface IPostItem {
  ["id"]: string;
  ["title"]: string;
  ["description"]: string;
  ["image_url"]: string;
  ["html"]: string;
}
export interface ICarouselProps {
  data: Array<IPostItem>
  handleRedirectToPost: () => void;
}