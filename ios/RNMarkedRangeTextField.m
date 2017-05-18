//
//  RNMarkedRangeTextField.m
//  RNMarkedRangeTextInput
//
//  Created by Bell Zhong on 2017/5/18.
//  Copyright © 2017年 shimo. All rights reserved.
//

#import "RNMarkedRangeTextField.h"

@implementation RNMarkedRangeTextField

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
    if ((self = [super initWithEventDispatcher:eventDispatcher])) {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(textFieldChanged:) name:UITextFieldTextDidChangeNotification object:nil];
    }
    return self;
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self name:UITextFieldTextDidChangeNotification object:nil];
}

- (void)textFieldChanged:(NSNotification* )notification
{
    if (notification.object != self) {
        return;
    }
    
    UITextRange *markedRange = self.markedTextRange;
    NSInteger start = [self offsetFromPosition:[self beginningOfDocument] toPosition:markedRange.start];
    NSInteger end = [self offsetFromPosition:[self beginningOfDocument] toPosition:markedRange.end];
    NSString *markedText = [self textInRange:markedRange];
    NSString *text = self.text;
    if (end > start) {
        NSString *temp = @"";
        if (start > 0) {
            temp = [temp stringByAppendingString:[text substringToIndex:start]];
        }
        NSInteger length = text.length;
        if (end < length) {
            temp = [temp stringByAppendingString:[text substringFromIndex:end]];
        }
        text = temp;
    }
    
    _onMarkedRangeChanged(@{
                            @"markedRange": @{
                                    @"start": @(start),
                                    @"end": @(end),
                                    @"text": markedText
                                    }
                            });
    
    _onChangeText(@{
                    @"text": text,
                    });
}

@end
