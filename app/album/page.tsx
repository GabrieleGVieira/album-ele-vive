import { getAlbum } from "@/lib/getAlbum";
import AlbumHome from "@/components/AlbumHome";


export default async function AlbumPage() {
  const album = await getAlbum();

  return <><AlbumHome album={album} /></>
}
