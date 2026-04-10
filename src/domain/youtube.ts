import { LanceYoutube } from '@/types'

export function montarUrlLance(lance: LanceYoutube): string {
  return `https://www.youtube.com/watch?v=${lance.videoId}&t=${lance.startSeconds}s`
}

export function montarUrlEmbed(lance: LanceYoutube): string {
  return `https://www.youtube.com/embed/${lance.videoId}?start=${lance.startSeconds}&autoplay=1`
}

export function formatarTempoLive(segundos: number): string {
  const horas = Math.floor(segundos / 3600)
  const minutos = Math.floor((segundos % 3600) / 60)
  const segs = segundos % 60

  if (horas > 0) {
    return `${horas}:${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`
  }
  return `${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`
}
