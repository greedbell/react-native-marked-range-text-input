#import "RNMarkedRangeTextInputManager.h"
#import "RNMarkedRangeTextInput.h"

@implementation RNMarkedRangeTextInputManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
    return [[RNMarkedRangeTextInput alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}


RCT_EXPORT_VIEW_PROPERTY(onMarkedRangeChanged, RCTDirectEventBlock)


@end
