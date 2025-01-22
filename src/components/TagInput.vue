<script setup lang="ts">
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { TagsInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/components/ui/tags-input'
import { useForm } from 'vee-validate';

const props = defineProps<{
    label: string
    description: string
    modelValue: any
}>()

const emit = defineEmits(['update:modelValue'])

useForm({
  initialValues: {
    data: ['Nada encontrado',],
  },
})

function removeTag(tag: string) {
    const updatedTags = props.modelValue.filter((t: any) => t !== tag)
    emit('update:modelValue', updatedTags)
}
</script>

<template>
    <form class="w-2/3 space-y-6">
        <FormField v-slot="{ value }" name="data">
            <FormItem>
                <FormLabel>{{ label }}</FormLabel>
                <FormControl>
                    <TagsInput :model-value="value">
                        <TagsInputItem v-for="item in modelValue" :key="item" :value="item.name">
                            <TagsInputItemText />
                            <TagsInputItemDelete @click="removeTag(item)" />
                        </TagsInputItem>

                    </TagsInput>
                </FormControl>
                <FormDescription>
                    {{ description }}
                </FormDescription>
                <FormMessage />
            </FormItem>
        </FormField>
    </form>
</template>