import { koffi } from '../../private.js'
import { user32 } from './_lib.js'
import {
    ctypes,
    cLPVOID, cBOOL, cINT, cUINT, cDWORD, cLPCWSTR,
    cHANDLE, cHINSTANCE,
    cWPARAM, cLPARAM, cLRESULT,
    type HINSTANCE, type HANDLE, type LPARAM, type WPARAM
} from '../../ctypes.js'
import { cHMENU, type HMENU } from './menu.js'

// #region Types

export const cHWND = cHANDLE
export type HWND = HANDLE<'HWND'>

export const cWNDPROC = koffi.pointer('WNDPROC', koffi.proto('__wndproc', cLRESULT, [ cHWND, cUINT, cWPARAM, cLPARAM ]))
export type WNDPROC = (hWnd: HWND, msg: WM, wParam: WPARAM, lParam: LPARAM) => number

// #endregion

// #region Functions

/**
 * Creates an overlapped, pop-up, or child window.
 *
 * https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-createwindoww
 */
export function CreateWindow(
    lpClassName:  string | null,
    lpWindowName: string | null,
    dwStyle:      WS,
    x:            number,
    y:            number,
    nWidth:       number,
    nHeight:      number,
    hWndParent:   HWND | null,
    hMenu:        HMENU | null,
    hInstance:    HINSTANCE | null,
    lpParam:      any,
): HWND {
    return CreateWindowEx(0, lpClassName, lpWindowName, dwStyle, x, y, nWidth, nHeight, hWndParent, hMenu, hInstance, lpParam)
}

/**
 * Creates an overlapped, pop-up, or child window with an extended window style.
 *
 * https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-createwindowexw
 */
export const CreateWindowEx: koffi.KoffiFunc<(
    dwExStyle:    WS_EX,
    lpClassName:  string | null,
    lpWindowName: string | null,
    dwStyle:      WS,
    x:            number,
    y:            number,
    nWidth:       number,
    nHeight:      number,
    hWndParent:   HWND | null,
    hMenu:        HMENU | null,
    hInstance:    HINSTANCE | null,
    lpParam:      any,
) => HWND> = user32.lib.func(
    'CreateWindowExW', cHWND,
    [ cDWORD, cLPCWSTR, cLPCWSTR, cDWORD, ctypes.int, ctypes.int, ctypes.int, ctypes.int, cHWND, cHMENU, cHINSTANCE, cLPVOID ]
)

/**
 * Calls the default window procedure to provide default processing for any window messages that an application does not process.
 *
 * https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-defwindowprocw
 */
export const DefWindowProc: koffi.KoffiFunc<WNDPROC> = user32.lib.func('DefWindowProcW', cLRESULT, [ cHWND, cUINT, cWPARAM, cLPARAM ])

/**
 * Sets the specified window's show state.
 *
 * https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-showwindow
 */
export const ShowWindow: koffi.KoffiFunc<(
    hWnd:     HWND,
    nCmdShow: SW
) => boolean> = user32.lib.func('ShowWindow', cBOOL, [ cHWND, cINT ])

/**
 * Sets the show state of a window without waiting for the operation to complete.
 *
 * https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-showwindowasync
 */
export const ShowWindowAsync: koffi.KoffiFunc<(
    hWnd:     HWND,
    nCmdShow: SW
) => boolean> = user32.lib.func('ShowWindowAsync', cBOOL, [ cHWND, cINT ])

/**
 * Updates the client area of the specified window by sending a WM_PAINT message to the window if the window's update region is not empty.
 *
 * https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-updatewindow
 */
export const UpdateWindow: koffi.KoffiFunc<(
    hWnd: HWND
) => boolean> = user32.lib.func('UpdateWindow', cBOOL, [ cHWND ])
// #endregion

// #region Constants

/** SW_xxx - ShowWindow() Commands (nCmdShow) & identifiers for the WM_SHOWWINDOW message */
export const enum SW {
    HIDE            = 0,
    SHOWNORMAL      = 1,
    NORMAL          = 1,
    SHOWMINIMIZED   = 2,
    SHOWMAXIMIZED   = 3,
    MAXIMIZE        = 3,
    SHOWNOACTIVATE  = 4,
    SHOW            = 5,
    MINIMIZE        = 6,
    SHOWMINNOACTIVE = 7,
    SHOWNA          = 8,
    RESTORE         = 9,
    SHOWDEFAULT     = 10,
    FORCEMINIMIZE   = 11,
    MAX             = 11,

    PARENTCLOSING   = 1,
    OTHERZOOM       = 2,
    PARENTOPENING   = 3,
    OTHERUNZOOM     = 4,
}

/**
 * WM_xxx - Window Messages
 *
 * https://learn.microsoft.com/en-us/windows/win32/winmsg/window-notifications
 */
export const enum WM {
    ACTIVATE                       = 0x0006,
    ACTIVATEAPP                    = 0x001c,
    AFXFIRST                       = 0x0360,
    AFXLAST                        = 0x037f,
    APP                            = 0x8000,
    APPCOMMAND                     = 0x0319,
    ASKCBFORMATNAME                = 0x030c,
    CANCELJOURNAL                  = 0x004B,
    CANCELMODE                     = 0x001f,
    CAPTURECHANGED                 = 0x0215,
    CHANGECBCHAIN                  = 0x030d,
    CHANGEUISTATE                  = 0x0127,
    CHAR                           = 0x0102,
    CHARTOITEM                     = 0x002f,
    CHILDACTIVATE                  = 0x0022,
    CLEAR                          = 0x0303,
    CLIPBOARDUPDATE                = 0x031d,
    CLOSE                          = 0x0010,
    CODE_NOCHAR                    = 0xffff,
    COMMAND                        = 0x0111,
    COMMNOTIFY                     = 0x0044,
    COMPACTING                     = 0x0041,
    COMPAREITEM                    = 0x0039,
    CONTEXTMENU                    = 0x007b,
    COPY                           = 0x0301,
    COPYDATA                       = 0x004a,
    CREATE                         = 0x0001,
    CTLCOLORBTN                    = 0x0135,
    CTLCOLORDLG                    = 0x0136,
    CTLCOLOREDIT                   = 0x0133,
    CTLCOLORLISTBOX                = 0x0134,
    CTLCOLORMSGBOX                 = 0x0132,
    CTLCOLORSCROLLBAR              = 0x0137,
    CTLCOLORSTATIC                 = 0x0138,
    CUT                            = 0x0300,
    DEADCHAR                       = 0x0103,
    DELETEITEM                     = 0x002d,
    DESTROY                        = 0x0002,
    DESTROYCLIPBOARD               = 0x0307,
    DEVICECHANGE                   = 0x0219,
    DEVMODECHANGE                  = 0x001b,
    DISPLAYCHANGE                  = 0x007e,
    DPICHANGED                     = 0x02e0,
    DPICHANGED_AFTERPARENT         = 0x02e3,
    DPICHANGED_BEFOREPARENT        = 0x02e2,
    DRAWCLIPBOARD                  = 0x0308,
    DRAWITEM                       = 0x002b,
    DROPFILES                      = 0x0233,
    DWMCOLORIZATIONCOLORCHANGED    = 0x0320,
    DWMCOMPOSITIONCHANGED          = 0x031e,
    DWMNCRENDERINGCHANGED          = 0x031f,
    DWMSENDICONICLIVEPREVIEWBITMAP = 0x0326,
    DWMSENDICONICTHUMBNAIL         = 0x0323,
    DWMWINDOWMAXIMIZEDCHANGE       = 0x0321,
    ENABLE                         = 0x000a,
    ENDSESSION                     = 0x0016,
    ENTERIDLE                      = 0x0121,
    ENTERMENULOOP                  = 0x0211,
    ENTERSIZEMOVE                  = 0x0231,
    ERASEBKGND                     = 0x0014,
    EXITMENULOOP                   = 0x0212,
    EXITSIZEMOVE                   = 0x0232,
    FONTCHANGE                     = 0x001d,
    GESTURE                        = 0x0119,
    GESTURENOTIFY                  = 0x011a,
    GETDLGCODE                     = 0x0087,
    GETDPISCALEDSIZE               = 0x02e4,
    GETFONT                        = 0x0031,
    GETHMENU                       = 0x01e1,
    GETHOTKEY                      = 0x0033,
    GETICON                        = 0x007f,
    GETMINMAXINFO                  = 0x0024,
    GETOBJECT                      = 0x003d,
    GETTEXT                        = 0x000d,
    GETTEXTLENGTH                  = 0x000e,
    GETTITLEBARINFOEX              = 0x033f,
    HANDHELDFIRST                  = 0x0358,
    HANDHELDLAST                   = 0x035f,
    HELP                           = 0x0053,
    HOTKEY                         = 0x0312,
    HSCROLL                        = 0x0114,
    HSCROLLCLIPBOARD               = 0x030e,
    ICONERASEBKGND                 = 0x0027,
    IME_CHAR                       = 0x0286,
    IME_COMPOSITION                = 0x010f,
    IME_COMPOSITIONFULL            = 0x0284,
    IME_CONTROL                    = 0x0283,
    IME_ENDCOMPOSITION             = 0x010e,
    IME_KEYDOWN                    = 0x0290,
    IME_KEYLAST                    = 0x010f,
    IME_KEYUP                      = 0x0291,
    IME_NOTIFY                     = 0x0282,
    IME_REQUEST                    = 0x0288,
    IME_SELECT                     = 0x0285,
    IME_SETCONTEXT                 = 0x0281,
    IME_STARTCOMPOSITION           = 0x010d,
    INITDIALOG                     = 0x0110,
    INITMENU                       = 0x0116,
    INITMENUPOPUP                  = 0x0117,
    INPUT                          = 0x00ff,
    INPUT_DEVICE_CHANGE            = 0x00fe,
    INPUTLANGCHANGE                = 0x0051,
    INPUTLANGCHANGEREQUEST         = 0x0050,
    KEYDOWN                        = 0x0100,
    KEYFIRST                       = 0x0100,
    KEYLAST                        = 0x0109,
    KEYUP                          = 0x0101,
    KILLFOCUS                      = 0x0008,
    LBUTTONDBLCLK                  = 0x0203,
    LBUTTONDOWN                    = 0x0201,
    LBUTTONUP                      = 0x0202,
    MBUTTONDBLCLK                  = 0x0209,
    MBUTTONDOWN                    = 0x0207,
    MBUTTONUP                      = 0x0208,
    MDIACTIVATE                    = 0x0222,
    MDICASCADE                     = 0x0227,
    MDICREATE                      = 0x0220,
    MDIDESTROY                     = 0x0221,
    MDIGETACTIVE                   = 0x0229,
    MDIICONARRANGE                 = 0x0228,
    MDIMAXIMIZE                    = 0x0225,
    MDINEXT                        = 0x0224,
    MDIREFRESHMENU                 = 0x0234,
    MDIRESTORE                     = 0x0223,
    MDISETMENU                     = 0x0230,
    MDITILE                        = 0x0226,
    MEASUREITEM                    = 0x002c,
    MENUCHAR                       = 0x0120,
    MENUCOMMAND                    = 0x0126,
    MENUDRAG                       = 0x0123,
    MENUGETOBJECT                  = 0x0124,
    MENURBUTTONUP                  = 0x0122,
    MENUSELECT                     = 0x011f,
    MOUSEACTIVATE                  = 0x0021,
    MOUSEFIRST                     = 0x0200,
    MOUSEHOVER                     = 0x02a1,
    MOUSEHWHEEL                    = 0x020e,
    MOUSELAST                      = 0x020e,
    MOUSELEAVE                     = 0x02a3,
    MOUSEMOVE                      = 0x0200,
    MOUSEWHEEL                     = 0x020a,
    MOVE                           = 0x0003,
    MOVING                         = 0x0216,
    NCACTIVATE                     = 0x0086,
    NCCALCSIZE                     = 0x0083,
    NCCREATE                       = 0x0081,
    NCDESTROY                      = 0x0082,
    NCHITTEST                      = 0x0084,
    NCLBUTTONDBLCLK                = 0x00a3,
    NCLBUTTONDOWN                  = 0x00a1,
    NCLBUTTONUP                    = 0x00a2,
    NCMBUTTONDBLCLK                = 0x00a9,
    NCMBUTTONDOWN                  = 0x00a7,
    NCMBUTTONUP                    = 0x00a8,
    NCMOUSEHOVER                   = 0x02a0,
    NCMOUSELEAVE                   = 0x02a2,
    NCMOUSEMOVE                    = 0x00a0,
    NCPAINT                        = 0x0085,
    NCPOINTERDOWN                  = 0x0242,
    NCPOINTERUP                    = 0x0243,
    NCPOINTERUPDATE                = 0x0241,
    NCRBUTTONDBLCLK                = 0x00a6,
    NCRBUTTONDOWN                  = 0x00a4,
    NCRBUTTONUP                    = 0x00a5,
    NCXBUTTONDBLCLK                = 0x00ad,
    NCXBUTTONDOWN                  = 0x00ab,
    NCXBUTTONUP                    = 0x00ac,
    NEXTDLGCTL                     = 0x0028,
    NEXTMENU                       = 0x0213,
    NOTIFY                         = 0x004e,
    NOTIFYFORMAT                   = 0x0055,
    NULL                           = 0x0000,
    PAINT                          = 0x000f,
    PAINTCLIPBOARD                 = 0x0309,
    PAINTICON                      = 0x0026,
    PALETTECHANGED                 = 0x0311,
    PALETTEISCHANGING              = 0x0310,
    PARENTNOTIFY                   = 0x0210,
    PASTE                          = 0x0302,
    PENWINFIRST                    = 0x0380,
    PENWINLAST                     = 0x038f,
    POINTERACTIVATE                = 0x024b,
    POINTERCAPTURECHANGED          = 0x024c,
    POINTERDEVICECHANGE            = 0x0238,
    POINTERDEVICEINRANGE           = 0x0239,
    POINTERDEVICEOUTOFRANGE        = 0x023a,
    POINTERDOWN                    = 0x0246,
    POINTERENTER                   = 0x0249,
    POINTERHITTEST                 = 0x0250,
    POINTERHWHEEL                  = 0x024f,
    POINTERLEAVE                   = 0x024a,
    POINTERROUTEDAWAY              = 0x0252,
    POINTERROUTEDRELEASED          = 0x0253,
    POINTERROUTEDTO                = 0x0251,
    POINTERUP                      = 0x0247,
    POINTERUPDATE                  = 0x0245,
    POINTERWHEEL                   = 0x024e,
    POWER                          = 0x0048,
    POWERBROADCAST                 = 0x0218,
    PRINT                          = 0x0317,
    PRINTCLIENT                    = 0x0318,
    QUERYDRAGICON                  = 0x0037,
    QUERYENDSESSION                = 0x0011,
    QUERYNEWPALETTE                = 0x030f,
    QUERYOPEN                      = 0x0013,
    QUERYUISTATE                   = 0x0129,
    QUEUESYNC                      = 0x0023,
    QUIT                           = 0x0012,
    RBUTTONDBLCLK                  = 0x0206,
    RBUTTONDOWN                    = 0x0204,
    RBUTTONUP                      = 0x0205,
    RENDERALLFORMATS               = 0x0306,
    RENDERFORMAT                   = 0x0305,
    SETCURSOR                      = 0x0020,
    SETFOCUS                       = 0x0007,
    SETFONT                        = 0x0030,
    SETHOTKEY                      = 0x0032,
    SETICON                        = 0x0080,
    SETREDRAW                      = 0x000b,
    SETTEXT                        = 0x000c,
    SHOWWINDOW                     = 0x0018,
    SIZE                           = 0x0005,
    SIZECLIPBOARD                  = 0x030b,
    SIZING                         = 0x0214,
    SPOOLERSTATUS                  = 0x002a,
    STYLECHANGED                   = 0x007d,
    STYLECHANGING                  = 0x007c,
    SYNCPAINT                      = 0x0088,
    SYSCHAR                        = 0x0106,
    SYSCOLORCHANGE                 = 0x0015,
    SYSCOMMAND                     = 0x0112,
    SYSDEADCHAR                    = 0x0107,
    SYSKEYDOWN                     = 0x0104,
    SYSKEYUP                       = 0x0105,
    TABLET_FIRST                   = 0x02c0,
    TABLET_LAST                    = 0x02df,
    TCARD                          = 0x0052,
    THEMECHANGED                   = 0x031a,
    TIMECHANGE                     = 0x001e,
    TIMER                          = 0x0113,
    TOUCH                          = 0x0240,
    TOUCHHITTESTING                = 0x024d,
    UNDO                           = 0x0304,
    UNICHAR                        = 0x0109,
    UNINITMENUPOPUP                = 0x0125,
    UPDATEUISTATE                  = 0x0128,
    USERCHANGED                    = 0x0054,
    VKEYTOITEM                     = 0x002e,
    VSCROLL                        = 0x0115,
    VSCROLLCLIPBOARD               = 0x030a,
    WINDOWPOSCHANGED               = 0x0047,
    WINDOWPOSCHANGING              = 0x0046,
    WININICHANGE                   = 0x001a,
    WTSSESSION_CHANGE              = 0x02b1,
    XBUTTONDBLCLK                  = 0x020d,
    XBUTTONDOWN                    = 0x020b,
    XBUTTONUP                      = 0x020c,
    SETTINGCHANGE                  = WININICHANGE,

    /*
    * NOTE: All Message Numbers below 0x0400 are RESERVED.
    *
    * Private Window Messages Start Here:
    */
    USER = 0x0400
}

/** WM_ACTIVATE state values. */
export const enum WM_ACTIVATE {
    INACTIVE    = 0,
    ACTIVE      = 1,
    CLICKACTIVE = 2,
}

/**
 * WS_xxx - Window styles.
 *
 * https://learn.microsoft.com/en-us/windows/win32/winmsg/window-styles
 */
export const enum WS {
    BORDER           = 0x00800000,
    CAPTION          = 0x00c00000, /* WS_BORDER | WS_DLGFRAME  */
    CHILD            = 0x40000000,
    CLIPCHILDREN     = 0x02000000,
    CLIPSIBLINGS     = 0x04000000,
    DISABLED         = 0x08000000,
    DLGFRAME         = 0x00400000,
    GROUP            = 0x00020000,
    HSCROLL          = 0x00100000,
    MAXIMIZE         = 0x01000000,
    MAXIMIZEBOX      = 0x00010000,
    MINIMIZE         = 0x20000000,
    MINIMIZEBOX      = 0x00020000,
    OVERLAPPED       = 0x00000000,
    POPUP            = 0x80000000,
    SYSMENU          = 0x00080000,
    TABSTOP          = 0x00010000,
    THICKFRAME       = 0x00040000,
    VISIBLE          = 0x10000000,
    VSCROLL          = 0x00200000,
    CHILDWINDOW      = CHILD,
    ICONIC           = MINIMIZE,
    OVERLAPPEDWINDOW = OVERLAPPED | CAPTION | SYSMENU | THICKFRAME | MINIMIZEBOX | MAXIMIZEBOX,
    POPUPWINDOW      = POPUP | BORDER | SYSMENU,
    SIZEBOX          = THICKFRAME,
    TILED            = OVERLAPPED,
    TILEDWINDOW      = OVERLAPPEDWINDOW,
}

/**
 * WS_EX_xxx - Extended Window styles
 *
 * https://learn.microsoft.com/en-us/windows/win32/winmsg/extended-window-styles
 */
export const enum WS_EX {
    ACCEPTFILES         = 0x00000010,
    APPWINDOW           = 0x00040000,
    CLIENTEDGE          = 0x00000200,
    COMPOSITED          = 0x02000000,
    CONTEXTHELP         = 0x00000400,
    CONTROLPARENT       = 0x00010000,
    DLGMODALFRAME       = 0x00000001,
    EX_LAYOUTRTL        = 0x00400000,
    LAYERED             = 0x00080000,
    LEFT                = 0x00000000,
    LEFTSCROLLBAR       = 0x00004000,
    LTRREADING          = 0x00000000,
    MDICHILD            = 0x00000040,
    NOACTIVATE          = 0x08000000,
    NOINHERITLAYOUT     = 0x00100000,
    NOPARENTNOTIFY      = 0x00000004,
    NOREDIRECTIONBITMAP = 0x00200000,
    RIGHT               = 0x00001000,
    RIGHTSCROLLBAR      = 0x00000000,
    RTLREADING          = 0x00002000,
    STATICEDGE          = 0x00020000,
    TOOLWINDOW          = 0x00000080,
    TOPMOST             = 0x00000008,
    TRANSPARENT         = 0x00000020,
    WINDOWEDGE          = 0x00000100,
    OVERLAPPEDWINDOW    = WINDOWEDGE | CLIENTEDGE,
    PALETTEWINDOW       = WINDOWEDGE | TOOLWINDOW | TOPMOST,
}

/** Special value for X and Y parameters of CreateWindow/CreateWindowEx */
export const enum CW {
    USEDEFAULT = 0x80000000
}

// #endregion
