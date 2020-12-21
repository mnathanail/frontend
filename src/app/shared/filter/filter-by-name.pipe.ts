import {Pipe, PipeTransform} from '@angular/core';
import {SkillNode} from '../../profile/profile-skill-list/profile-skill-item/skill-node';
import {SkillModel} from '../../profile/profile-skill-list/profile-skill-item/skill-model';

@Pipe({
    name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

    transform(value: any[], filter: string): unknown {
        if (!value || !filter) {
            return value;
        }
        return value.filter(item => item.value.skillNode.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
}
