import React, { ReactNode, useState } from 'react';
import { RefreshCw } from 'lucide-react';

export interface FlatListProps<T> {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  ListHeaderComponent?: ReactNode | (() => ReactNode);
  ListEmptyComponent?: ReactNode | (() => ReactNode);
  ItemSeparatorComponent?: () => ReactNode;
  refreshing?: boolean;
  onRefresh?: () => void;
  contentContainerClassName?: string;
  className?: string;
  testID?: string;
}

export function FlatList<T>({
  data,
  renderItem,
  keyExtractor = (_, index) => index.toString(),
  ListHeaderComponent,
  ListEmptyComponent,
  ItemSeparatorComponent,
  refreshing = false,
  onRefresh,
  contentContainerClassName = '',
  className = '',
  testID = 'flat-list',
}: FlatListProps<T>) {
  const [internalRefreshing, setInternalRefreshing] = useState(false);

  const handleManualRefresh = () => {
    if (onRefresh) {
      setInternalRefreshing(true);
      onRefresh();
      setTimeout(() => setInternalRefreshing(false), 600);
    }
  };

  const isRefreshing = refreshing || internalRefreshing;

  const headerContent = typeof ListHeaderComponent === 'function' 
    ? ListHeaderComponent() 
    : ListHeaderComponent;

  const emptyContent = typeof ListEmptyComponent === 'function'
    ? ListEmptyComponent()
    : ListEmptyComponent;

  return (
    <div 
      data-testid={testID} 
      className={`relative flex-1 overflow-y-auto no-scrollbar scroll-smooth ${className}`}
    >
      {/* Pull-To-Refresh Visual Indicator (React Native standard) */}
      {onRefresh && (
        <div className="flex justify-center pt-2 pb-1">
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-all active:scale-95 cursor-pointer shadow-xs"
            title="Simulate pull-to-refresh"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-teal-600' : ''}`} />
            <span>{isRefreshing ? 'Refreshing roster...' : 'Pull to refresh'}</span>
          </button>
        </div>
      )}

      <div className={`pb-8 ${contentContainerClassName}`}>
        {/* List Header Component */}
        {headerContent && <div className="mb-3">{headerContent}</div>}

        {/* Empty State */}
        {data.length === 0 ? (
          emptyContent || (
            <div className="py-12 text-center text-slate-500 text-sm">
              No items to display.
            </div>
          )
        ) : (
          /* List Items */
          <div className="space-y-3">
            {data.map((item, index) => {
              const key = keyExtractor(item, index);
              return (
                <React.Fragment key={key}>
                  {renderItem({ item, index })}
                  {ItemSeparatorComponent && index < data.length - 1 && (
                    <ItemSeparatorComponent />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
