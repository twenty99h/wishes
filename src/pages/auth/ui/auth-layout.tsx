import { Flex, Text } from '@/shared/ui';
import { Outlet } from 'react-router';

export function AuthLayout() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-[484px] flex-col gap-6">
        <Flex align="center" justify="center">
          <Text size="xl" weight="bold">
            Вишбекс
          </Text>
        </Flex>
        <Outlet />
      </div>
    </div>
  );
}
