export interface IPostItem {
  id: string;
  title: string;
  description: string;
  html: string;
}
export interface ICarouselProps {
  data: Array<IPostItem>;
  handleRedirectToPost: (id: string) => void;
}
