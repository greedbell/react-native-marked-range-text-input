#import "RNMarkedRangeTextInput.h"

@implementation RNMarkedRangeTextInput
{
    UITextRange *_previousMarkedRange;
}

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
    if ((self = [super initWithEventDispatcher:eventDispatcher])) {
        [self addTarget:self action:@selector(textFieldChanged) forControlEvents:UIControlEventEditingChanged];
    }
    return self;
}


- (void)textFieldChanged
{
    UITextRange *markedRange = self.markedTextRange;
    NSString * markedText = [self textInRange:markedRange];
    
    if (_onMarkedRangeChanged &&
        ![markedRange isEqual:_previousMarkedRange]) {
        
        _previousMarkedRange = markedRange;
        
        NSInteger start = [self offsetFromPosition:[self beginningOfDocument] toPosition:markedRange.start];
        NSInteger end = [self offsetFromPosition:[self beginningOfDocument] toPosition:markedRange.end];
        _onMarkedRangeChanged(@{
                             @"markedRange": @{
                                     @"start": @(start),
                                     @"end": @(end),
                                     @"text": markedText
                                     },
                             });
    }
}

@end
