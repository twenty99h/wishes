import { Flex, Input, LoadingButton, Text } from '@/shared/ui';
import { useUnit } from 'effector-react';
import { Check } from 'lucide-react';
import { $isParsingPending, $isParsingUrlValid, $parsingUrl, parsingUrlChanged, urlValidationStarted } from '../model';

export function WishParsing() {
  const [parsingUrl, onParsingUrlChange, onStartValidation, isParsingUrlValid, isParsingPending] = useUnit([
    $parsingUrl,
    parsingUrlChanged,
    urlValidationStarted,
    $isParsingUrlValid,
    $isParsingPending,
  ]);

  return (
    <Flex direction="column" gap={1}>
      <Flex width="max" gap={2}>
        <Input
          id="url"
          placeholder="https://www.wildberries.ru/catalog/264361745/detail.aspx"
          value={parsingUrl}
          onChange={(e) => onParsingUrlChange(e.target.value)}
        />
        <LoadingButton
          startIcon={<Check className="h-4 w-4" />}
          loading={isParsingPending}
          onClick={onStartValidation}
        ></LoadingButton>
      </Flex>
      {!isParsingUrlValid && (
        <Text size="sm" variant="destructive">
          Невалидная ссылка
        </Text>
      )}
    </Flex>
  );
}
