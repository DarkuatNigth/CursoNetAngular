import { Pipe, PipeTransform } from '@angular/core';

const FILE_SIZE_UNITS =
[
  'B','KB','MB','GB','PB','EB','ZB','YB'
];
const FILE_SIZE_UNITS_LONG = [ 'Bytes', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Pettabytes','Exabytes', 'Zettabytes', 'Yottabytes'];


@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(nbSizeInBytes: number, lgLongForm?: boolean): string {
    const units = lgLongForm
    ? FILE_SIZE_UNITS_LONG
    : FILE_SIZE_UNITS;
    let nbPower = Math.round(Math.log(nbSizeInBytes) / Math.log(1024));
    nbPower = Math.min(nbPower, units.length - 1);
    const size = nbSizeInBytes / Math.pow(1024, nbPower);
    const strFormattedSize = Math.round(size * 100) / 100;
    const objUnit = units[nbPower];
    return size ? `${strFormattedSize} ${objUnit}` : '0 B';
  }

}
